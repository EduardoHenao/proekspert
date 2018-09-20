export class GeoLocationService {
    public pos: any;

    public GetLatitude() {
        navigator.geolocation.getCurrentPosition((position) => {this.pos = position});
    }
}