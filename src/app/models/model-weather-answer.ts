// this file contains all the subclasses for the API model for day forecast

export class ModelWeatherWeather { 
    description: string;
    icon: string;

    constructor(description: string, icon: string) {
        this.description = description;
        this.icon = icon;
    }
}

export class ModelWeatherMain {
    temp: number;
    
    constructor(temp: number) {
        this.temp = temp;
    }
}

export class ModelWeatherAnswer {
    weather: ModelWeatherWeather[];
    main: ModelWeatherMain;
    name: string;

    constructor(main: ModelWeatherMain, name: string) {
        this.main = main;
        this.name = name;
        this.weather = [];
    }

    // for some reason that I cant fix in another way, typescript matches the api answer to this class,
    // however the js object in the back is the same, so it preserves ALL the other fields sent from the service.
    // this is not good when trying to save the model to a cookie due to its size.
    // so the purpose of this method is actually to create a full copy, with only the required fields.
    static Copy(model: ModelWeatherAnswer): ModelWeatherAnswer {
        var answer = new ModelWeatherAnswer(new ModelWeatherMain(model.main.temp), model.name);
        for (const weatherMember of model.weather) {
            answer.weather.push(new ModelWeatherWeather(weatherMember.description, weatherMember.icon));
        }
        return answer;
    }
};

