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

    static Trim(model: ModelWeatherAnswer): ModelWeatherAnswer {
        var answer = new ModelWeatherAnswer(new ModelWeatherMain(model.main.temp), model.name);
        for (const weatherMember of model.weather) {
            answer.weather.push(new ModelWeatherWeather(weatherMember.description, weatherMember.icon));
        }
        return answer;
    }
};

