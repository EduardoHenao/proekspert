export class ModelWeatherBaseRequest {
    appid:  string;
    units: string;

    constructor() {
        this.units = "metric";
    }
}