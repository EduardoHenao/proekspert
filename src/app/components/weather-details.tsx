import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../stores/meteo-store";
import { WeatherIcon } from "./weather-icon";
import { WeatherDayForecast } from "./weather-day-forecast";

export interface WeatherDetailsProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class WeatherDetails extends React.Component<WeatherDetailsProps> {
    render() {
        return <div className="weather-details">
            <div className="weather-details__temp-big">{this.props.meteoStore.GetTemperature()}</div>
            <div className="weather-details__icon">
                <WeatherIcon weatherCode={this.props.meteoStore!.GetIconCode()}></WeatherIcon>
            </div>
            <WeatherDayForecast></WeatherDayForecast>
        </div>;
    }
}