import { observable, action, computed } from 'mobx';
import { JsonService } from '../services/json-service';
import { ModelWeatherRequest } from '../models/model-weather';
import { ModelWeatherAnswer } from '../models/model-weather-answer';

export class MeteoStore {
    jsonService: JsonService;
    @observable modelWeather: ModelWeatherAnswer | null;

    // url constants
    // example: 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=c08ebd64eae72d114b42b2cbb8b6aa77';
    private baseUrl: string = "http://api.openweathermap.org/";
    private key: string = "c08ebd64eae72d114b42b2cbb8b6aa77";
    private method_weather : string = "data/2.5/weather";
    private units: string = "metric";

    constructor()
    {
        this.modelWeather = null;
        this.jsonService = new JsonService();
        this.jsonService.configure(this.baseUrl);
    }

    GetCity = () : string | null => {
        // TODO: recover cookie
        return "Tallinn";
    }

    @computed get isInfoLoaded(): boolean {
        if(this.modelWeather !== null) return true;
        return false;
    }

    @action async GetInfo (cityName: string) {
        console.log(`GetInfo(${cityName})`)
        const { status, value } = await this.jsonService.fetchAsJson<ModelWeatherAnswer>("GET", this.method_weather, undefined, new ModelWeatherRequest(cityName, this.key, this.units));
        if (status === 200) {
            const answer: ModelWeatherAnswer = value;
            return answer;
        }

        return null;
    }
}