export class ModelForecastDayMain { 
    temp: number;
}

export class ModelForecastDayWeather { 
    icon: string;
}

export class ModelForecastDayData {
    main: ModelForecastDayMain;
    dt_txt: string;
    weather: ModelForecastDayWeather[]
}

export class ModelForecastDayAnswer {
    list: ModelForecastDayData [];
};