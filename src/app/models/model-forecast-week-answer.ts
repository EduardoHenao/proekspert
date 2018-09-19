export class ModelForecastDayMain { 
    temp: number;
}

export class ModelForecastDayData {
    main: ModelForecastDayMain;
    dt_txt: string;
}

export class ModelForecastDayAnswer {
    list: ModelForecastDayData [];
};