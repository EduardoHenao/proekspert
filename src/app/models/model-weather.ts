export class ModelWeather {
    appid:  string;
    q: string;

    constructor(cityName: string, appid: string) {
        this.q = cityName;
        this.appid = appid;
    }
}