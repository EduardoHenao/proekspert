import * as React from "react";
import { MeteoStore } from '../stores/meteo-store';
import { inject, observer } from "mobx-react";

export interface WeatherIconProps {
    meteoStore?: MeteoStore;
    weatherCode: string;
}

@inject("meteoStore")
@observer
export class WeatherIcon extends React.Component<WeatherIconProps> {
    render() {
        return <div className="weather-icon">
        {https://openweathermap.org/weather-conditions   search hoto ::before in perf}
        </div>;
    }
}