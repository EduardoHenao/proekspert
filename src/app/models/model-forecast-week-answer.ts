export class ModelForecastDayMain {
    temp: number;

    constructor(temp: number) {
        this.temp = temp;
    }
}

export class ModelForecastDayWeather { 
    icon: string;

    constructor(icon: string) {
        this.icon = icon;
    }
}

export class ModelForecastDayData {
    main: ModelForecastDayMain;
    dt_txt: string;
    weather: ModelForecastDayWeather[]

    constructor(main: ModelForecastDayMain, dt_txt: string) {
        this.main = main;
        this.dt_txt = dt_txt;
        this.weather = [];
    }
}

export class ModelForecastDayAnswer {
    list: ModelForecastDayData [];

    constructor() {
        this.list = [];
    }

    static Trim(model: ModelForecastDayAnswer): ModelForecastDayAnswer {
        var answer = new ModelForecastDayAnswer();
        var counter: number = 0;

        for (const listMember of model.list) {
            if(counter <= 8 || ModelForecastDayAnswer.IsNoon(listMember.dt_txt)) { // first 24hr are first 8 segments, then only those at 12h00 for daily forecast
                var newListMember = new ModelForecastDayData(new ModelForecastDayMain(listMember.main.temp),listMember.dt_txt);

                for (const weatherMember of listMember.weather) {
                    newListMember.weather.push(new ModelForecastDayWeather(weatherMember.icon));
                }
                answer.list.push(newListMember);
            }
            counter++;
        }
        return answer;
    }

    static IsNoon(dateString: string): boolean {
        //format is  "2018-09-19 21:00:00"
        var dateAndHourText = dateString.split(" ", 2);
        var hourText = dateAndHourText[1].split(":", 1);
        var h = Number(hourText[0]);
        return h === 12;
    }
};