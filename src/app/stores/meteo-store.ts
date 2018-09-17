import {observable} from 'mobx';

export class MeteoStore {
    @observable imAlive = 'Im alive';

    GetCity = () : string | null => {
        // TODO: recover cookie
        return "Tallinn";
    }

    GetInfo = (cityName: string) : void => {
        console.log("GetInfo('" + cityName + "')");
        const endpoint = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=c08ebd64eae72d114b42b2cbb8b6aa77';
    }
}