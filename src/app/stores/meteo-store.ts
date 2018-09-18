import {observable, action} from 'mobx';
import { JsonService } from '../services/json-service';
import { ModelWeather } from '../models/model-weather';

export class MeteoStore {
    @observable imAlive = 'Im alive';
    jsonService: JsonService = new JsonService();

    // url constants
    // example: 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=c08ebd64eae72d114b42b2cbb8b6aa77';
    private baseUrl: string = "http://api.openweathermap.org/";
    private key: string = "c08ebd64eae72d114b42b2cbb8b6aa77";
    private method_weather : string = "data/2.5/weather";

    constructor()
    {
        this.jsonService.configure(this.baseUrl);
    }

    GetCity = () : string | null => {
        // TODO: recover cookie
        return "Tallinn";
    }

    @action async GetInfo (cityName: string) {
        console.log(`GetInfo(${cityName})`)
        const { status, value } = await this.jsonService.fetchAsJson("GET", this.method_weather, undefined, new ModelWeather(cityName, this.key));
        if (status === 200) {
            console.log(value);
        }
    }
}