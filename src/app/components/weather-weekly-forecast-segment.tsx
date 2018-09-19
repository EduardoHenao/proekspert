import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../stores/meteo-store";
import { WeatherIcon } from "./weather-icon";

export interface WeatherWeeklyForecastSegmentProps {
    meteoStore?: MeteoStore;
    dayName: string;
    temp: string;
    iconCode: string;
}

@inject("meteoStore")
@observer
export class WeatherWeeklyForecastSegment extends React.Component<WeatherWeeklyForecastSegmentProps> {
    render() {
        return <div className="weather-weekly-forecast-segment">
            <div className="weather-weekly-forecast-segment__day-name">{this.props.dayName}</div>
            <div className="weather-weekly-forecast-segment__icon">
                <WeatherIcon weatherCode={this.props.iconCode}></WeatherIcon>
            </div>
            <div className="weather-weekly-forecast-segment__temperature">{this.props.temp}</div>
        </div>;
    }
}