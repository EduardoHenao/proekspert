// this class represents is the json model containing the data for the API request with the city name.

import { ModelWeatherBaseRequest } from "./model-weather-base-request";

export class ModelWeatherByGeocoordsRequest extends ModelWeatherBaseRequest {
    lat: string;
    lon: string;

    constructor(lat: string, lon: string, appid: string) {
        super();
        this.lat = lat;
        this.lon = lon;
        this.appid = appid;
    }
}