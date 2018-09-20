import * as Cookies from "js-cookie";

export class CookieService { //implements ICookieService {

    public static keyMeteo: string = "meteoKey";
    public static keyForecast: string = "forecastKey";
    private daysToExpire: number = 7;

    public setCookie(key:string, object: Object): void {
        Cookies.set(key, object,{ expires: this.daysToExpire });
    }

    public getCookie<T>(key: string): T {
        var value: any = Cookies.getJSON(key);
        var answer: T  = value as T;
        return answer;
    }
}