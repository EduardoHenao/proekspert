export class ModelDayForecast {
    temp: string;
    segmentOfDay: string;

    constructor(temp: string, segmentOfDay: string) {
        this.temp = temp;
        this.segmentOfDay = segmentOfDay;
    }
}