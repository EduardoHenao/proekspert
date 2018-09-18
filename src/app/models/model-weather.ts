export class ModelWeatherRequest {
    appid:  string;
    q: string;
    units: string;

    constructor(cityName: string, appid: string, units: string) {
        this.q = cityName;
        this.appid = appid;
        this.units = units;
    }
}