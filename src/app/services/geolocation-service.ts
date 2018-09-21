// this small service is used to recover the geolocation data from the browser
import { MeteoStore } from "../stores/meteo-store";

export class GeoLocationService {
    public pos: any;
    private meteoStoreInstance: MeteoStore;

    constructor(meteoStoreInstance: MeteoStore) {
        this.meteoStoreInstance = meteoStoreInstance;
    }

    public GetLatitude() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        } else {
            console.log("geolocation not available for this browser");
        }
    }

    displayLocationInfo = (position: any):void => {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        this.meteoStoreInstance.LoadInfoByGeoCoords(lat, lon);
    }
}