import { ModelWeatherBaseRequest } from "./model-weather-base-request";

export class ModelWeatherByNameRequest extends ModelWeatherBaseRequest {
    q: string;

    constructor(cityName: string, appid: string) {
        super();
        this.q = cityName;
        this.appid = appid;
    }
}