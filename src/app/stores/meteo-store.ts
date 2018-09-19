import { observable, action, computed } from 'mobx';
import { JsonService } from '../services/json-service';
import { ModelWeatherRequest } from '../models/model-weather';
import { ModelWeatherAnswer } from '../models/model-weather-answer';

export class MeteoStore {
    jsonService: JsonService;
    @observable private modelWeather: ModelWeatherAnswer | null; // the model should stay inside the store, all info is exposed via methods
    @observable isMetric: boolean;

    // url constants
    // example: 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=c08ebd64eae72d114b42b2cbb8b6aa77';
    private baseUrl: string = "http://api.openweathermap.org/";
    private key: string = "c08ebd64eae72d114b42b2cbb8b6aa77";
    private method_weather : string = "data/2.5/weather";

    constructor()
    {
        this.jsonService = new JsonService();
        this.jsonService.configure(this.baseUrl);
        this.modelWeather = null;
        this.isMetric = true;
    }

    GetCity = () : string | null => {
        // TODO: recover cookie
        return "Tallinn";
    }

    @computed get isInfoLoaded(): boolean {
        var answer = false;
        if(this.modelWeather !== null) answer = true;
        return answer;
    }

    @action async LoadInfo (cityName: string) {
        console.log(`LoadInfo(${cityName})`)
        const { status, value } = await this.jsonService.fetchAsJson<ModelWeatherAnswer>("GET", this.method_weather, undefined, new ModelWeatherRequest(cityName, this.key, this.isMetric ? "metric" : "imperial"));
        if (status === 200) {
            this.modelWeather = value;
            console.log(value);
        }
    }

    get GetUnitsLabel(): string {
        if(this.isMetric) return "ºC";
        return "ºF"
    }

    @action UnloadInfo() {
        console.log(`UnloadInfo()`);
        this.modelWeather = null;
    }

    @action SwitchUnits() {
        this.isMetric = !this.isMetric;
    }

    //methods for ModelWeatherAnswer
    @action GetCityName(): string {
        return this.modelWeather.name;
    }

    @action GetIconCode(): string {
        if (this.modelWeather.weather.length === 0) return ""; // a non existent meteo data, then no value maps to the default icon
        return this.modelWeather.weather[0].icon;
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
}