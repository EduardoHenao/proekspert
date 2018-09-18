export class ModelWeatherCoord {
    lon: number;
    lat: number;
};

export class ModelWeatherWeather { 
    id: number;
    main: string;
    description: string;
    icon: string;
}

export class ModelWeatherMain {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export class ModelWeatherWind {
    speed: number;
    deg: number;
}

export class ModelWeatherClouds {
    all: number;
}

export class ModelWeatherSys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export class ModelWeatherAnswer {
    coord: ModelWeatherCoord;
    weather: ModelWeatherWeather[];
    base: string;
    maing: ModelWeatherMain;
    visibility: number;
    wind: ModelWeatherWind;
    clouds: ModelWeatherClouds;
    dt: number;
    sys: ModelWeatherSys;
    id: number;
    name: string;
    cod: number;
};