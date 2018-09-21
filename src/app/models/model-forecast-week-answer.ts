// this file contains all the subclasses for the API model for week forecast

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

    // for some reason that I cant fix in another way, typescript matches the api answer to this class,
    // however the js object in the back is the same, so it preserves ALL the other fields sent from the service.
    // this is not good when trying to save the model to a cookie due to its size.
    // so the purpose of this method is actually to create a full copy, with only the required fields.
    static Copy(model: ModelForecastDayAnswer): ModelForecastDayAnswer {
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

    // utility method to determine if a segment date is at noon
    static IsNoon(dateString: string): boolean {
        //format is  "2018-09-19 21:00:00"
        var dateAndHourText = dateString.split(" ", 2);
        var hourText = dateAndHourText[1].split(":", 1);
        var h = Number(hourText[0]);
        return h === 12;
    }
};