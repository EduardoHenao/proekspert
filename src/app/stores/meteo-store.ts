import { CookieService } from './../services/cookie-service';
import { ModelForecastDayAnswer } from './../models/model-forecast-week-answer';
import { observable, action, computed } from 'mobx';
import { JsonService } from '../services/json-service';
import { ModelWeatherByNameRequest } from '../models/model-weather-by-name-request';
import { ModelWeatherAnswer } from '../models/model-weather-answer';
import { ModelDayForecast } from '../models/model-day-forecast';
import { GeoLocationService } from '../services/geolocation-service';
import { ModelWeatherBaseRequest } from '../models/model-weather-base-request';
import { ModelWeatherByGeocoordsRequest } from '../models/model-weather-by-geocoords-request';

export class MeteoStore {
    jsonService: JsonService;
    cookieService: CookieService;
    // the model should stay inside the store, all info is exposed via methods
    @observable private modelWeather: ModelWeatherAnswer | null; 
    @observable private modelForecastDay: ModelForecastDayAnswer | null;
    @observable isMetric: boolean;

    // url constants
    // example:                   'http://api.openweathermap.org/data/2.5/weather?q=London&appid=c08ebd64eae72d114b42b2cbb8b6aa77&units=metric';
    // example with geo location: 'http://api.openweathermap.org/data/2.5/weather?lat=48.8647&lon=2.3490&appid=c08ebd64eae72d114b42b2cbb8b6aa77&units=metric'
    private baseUrl: string = "https://api.openweathermap.org/";
    private key: string = "c08ebd64eae72d114b42b2cbb8b6aa77";
    private method_weather : string = "data/2.5/weather";
    private method_forecast : string = "data/2.5/forecast";

    constructor()
    {
        this.jsonService = new JsonService();
        this.cookieService = new CookieService();
        this.jsonService.configure(this.baseUrl);
        this.modelWeather = null;
        this.modelForecastDay = null;
        this.isMetric = true;

        this.RestoreFromCookies();
    }

    private RestoreFromCookies() {
        var storedWeather = this.cookieService.getCookie<ModelWeatherAnswer>(CookieService.keyMeteo);
        var storedForecast = this.cookieService.getCookie<ModelForecastDayAnswer>(CookieService.keyForecast);
        if (!storedWeather !== undefined && storedForecast !== undefined) {
            this.modelWeather = storedWeather;
            this.modelForecastDay = storedForecast;

            //then call to update
            this.LoadInfoByCityName(this.modelWeather.name)
        }
    }

    GetCity = () : string | null => {
        // TODO: recover cookie
        return "Tallinn";
    }

    @computed get isInfoLoaded(): boolean {
        var answer = false;
        if(this.modelWeather !== null && this.modelForecastDay !== null) answer = true;
        return answer;
    }

    @action async LoadInfoByCityName(cityName: string) {
        this.LoadInfo(this.method_weather, this.method_forecast, new ModelWeatherByNameRequest(cityName, this.key));
    }

    @action async LoadInfoByGeoCoords(lat: string, lon: string) {
        this.LoadInfo(this.method_weather, this.method_forecast, new ModelWeatherByGeocoordsRequest(lat, lon, this.key));
    }

    @action async LoadInfo (methodWeather: string, methodForecast: string, requestObject: ModelWeatherBaseRequest) {
        {
            var { status, value } = await this.jsonService.fetchAsJson<ModelWeatherAnswer>("GET", methodWeather, undefined, requestObject);
            if (status === 200) {
                var trimmedMeteo = ModelWeatherAnswer.Trim(value);
                this.modelWeather = trimmedMeteo;
                this.cookieService.setCookie(CookieService.keyMeteo, this.modelWeather);
            }
        }

        {
            const { status, value } = await this.jsonService.fetchAsJson<ModelForecastDayAnswer>("GET", methodForecast, undefined, requestObject);
            if (status === 200) {
                var trimmedForecast = ModelForecastDayAnswer.Trim(value);
                this.modelForecastDay = trimmedForecast;
                this.cookieService.setCookie(CookieService.keyForecast, this.modelForecastDay);
            }
        }
    }

    get GetUnitsLabel(): string {
        if(this.isMetric) return "ºC";
        return "ºF"
    }

    @action UnloadInfo() {
        console.log(`UnloadInfo()`);
        this.modelWeather = null;
        this.modelForecastDay = null;
    }

    @action SwitchUnits() {
        this.isMetric = !this.isMetric;
    }

    @action LoadFromGeoCoords() {
        var geo = new GeoLocationService(this);
        setInterval(geo.GetLatitude(), 10000);
    }

    //methods for ModelWeatherAnswer
    @action GetCityName(): string {
        return this.modelWeather.name;
    }

    @action GetIconCode(): string {
        if (this.modelWeather.weather.length === 0) return ""; // a non existent meteo data, then no value maps to the default icon
        return this.modelWeather.weather[0].icon;
    }

    @action GetWeatherName(): string {
        if (this.modelWeather.weather.length === 0) return ""; // a non existent meteo data, then no value maps to the default icon
        var weatherName = this.modelWeather.weather[0].description;
        return `${weatherName.charAt(0).toUpperCase()}${weatherName.slice(1)}`;
    }

    @action GetTemperature(): number {
        return this.modelWeather.main.temp;
    }

    // Methods for ModelForecastDayAnswer

    //the forecast is populated with segments of 3 hours, contaning the following 120 hours (5 days, 40 segments)
    //for the week forecast we divide the day in 4 pieces, which is 2 segments per piece
    // so here we transform the pieces [0] [2] [4] [6]
    @action GetDayForecast(): ModelDayForecast[] {
        var answer: ModelDayForecast[] = [];
        if(this.modelForecastDay) { // array musnt be null
            var count = 0;
            for (const data of this.modelForecastDay.list) {
                if(count % 2 == 0) {
                    answer.push(new ModelDayForecast(count, data.main.temp, this.ConvertDateToSegmentOfDay(data.dt_txt), ""));
                }
                count++;
                if(count > 6) break;
            }
        }
        return answer;
    }

    @action GetWeekForecast(): ModelDayForecast[] {
        var answer: ModelDayForecast[] = [];
        if(this.modelForecastDay) { // array musnt be null
            var count = 0;
            for (const data of this.modelForecastDay.list) {
                if(ModelForecastDayAnswer.IsNoon(data.dt_txt)) {
                    answer.push(new ModelDayForecast(count, data.main.temp, this.ConverToDayName(data.dt_txt), data.weather[0].icon));
                }
                count++;
            }
        }
        return answer;
    }

    private ConvertDateToSegmentOfDay(date: string): string {
        //format is  "2018-09-19 21:00:00"
        var dateAndHourText = date.split(" ", 2);
        var hourText = dateAndHourText[1].split(":", 1);
        var h = Number(hourText[0]);
        if ( h >= 0 && h < 6 ) return "Night";
        else if ( h >= 6 && h < 12 ) return "Morning";
        else if ( h >= 12 && h < 18 ) return "Day";
        else return "Evening";
    }

    private ConverToDayName(dateString: string): string {
        //format is  "2018-09-19 21:00:00"
        var dateAndHourText = dateString.split(" ", 2);
        var date = new Date(`${dateAndHourText[0]}T${dateAndHourText[1]}`);
        return this.ConvertDateToDayName(date);
    }

    private ConvertDateToDayName(date: Date): string {
        const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return days[date.getDay()];
    }

    
 
    // this maps the codes from json to our icon less mapping the meteo font icons "weather-icons-map"
    @action getClassFromWeatherCode(weatherCode: string): string{
        switch (weatherCode) {
            case "01d": return "icon-day-sunny";
            case "01n": return "icon-night-clear";
            case "02d": return "icon-day-cloudy";
            case "02n": return "icon-night-alt-cloudy";
            case "03d":
            case "03n": return "icon-cloud";
            case "04d":
            case "04n": return "icon-cloudy";
            case "09d":
            case "09n": return "icon-rain";
            case "10d": return "icon-day-rain";
            case "10n": return "icon-night-alt-rain";
            case "11d":
            case "11n": return "icon-thunderstorm";
            case "13d":
            case "13n": return "icon-snow";
            case "50d":
            case "50n": return "icon-windy";
            default:  return "icon-na";
        }
    }

    //date related methods
    GetDayOfWeek(): string {
        const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const date = new Date();
        return days[date.getDay()];
    }

    GetMonthOfYear(): string {
        var months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ];
        const date = new Date();
        return months[date.getMonth()]
    }

    GetYear(): string {
        var date = new Date();
        return date.getFullYear().toString();
    }

    GetOrdinalDate(): string {
        var date = new Date();
        var dayNumber = date.getDate();
        var ending = "";
        switch (dayNumber) {
            case 31:
            case 21:
            case 1: ending = "st";
            case 22:
            case 2: ending = "nd";
            case 23:
            case 3: ending = "rd";
            default: ending = "th";
        }
        return `${dayNumber}${ending}`;
    }
}