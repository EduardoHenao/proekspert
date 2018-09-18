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
}