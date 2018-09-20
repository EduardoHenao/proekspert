//this model is used either by the intra day forecast or the week forecast
export class ModelDayForecast {
    temp: number;
    name: string;
    iconCode: string;
    id: number;

    constructor(id: number, temp: number, segmentOfDay: string, iconCode: string) {
        this.id = id;
        this.temp = temp;
        this.name = segmentOfDay;
        this.iconCode = iconCode;
    }
}