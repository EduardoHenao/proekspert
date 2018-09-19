export interface ICookieService {
    setCookie(name: string, val: string): void;
    getCookie(name: string): string;
    deleteCookie(name: string): void;
}
export class CookieService implements ICookieService {

    public setCookie(name: string, val: string): void {
        const date = new Date();
        const value = val;

        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
    }

    public getCookie(name: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
        return "";
    }

    public deleteCookie(name: string): void {
        const date = new Date();

        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
    }
}