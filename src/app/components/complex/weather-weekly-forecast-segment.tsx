import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../../stores/meteo-store";
import { WeatherIcon } from "../basic/weather-icon";
import { Temperature } from "../basic/temperature";

// this class represents 1 of the intra day forecasts
// to the mid left portion of the screen
export interface WeatherWeeklyForecastSegmentProps {
    meteoStore?: MeteoStore;
    dayName: string;
    temp: number;
    iconCode: string;
}

// this class represents a block in the bottom of the screen containing (CityMeteo screen)
// the day name, temperature, and icon for each forecasted day.
@inject("meteoStore")
@observer
export class WeatherWeeklyForecastSegment extends React.Component<WeatherWeeklyForecastSegmentProps> {
    render() {
        return <div className="weather-weekly-forecast-segment">
            <div className="weather-weekly-forecast-segment__day-name">{this.props.dayName}</div>
            <div className="weather-weekly-forecast-segment__icon">
                <WeatherIcon weatherCode={this.props.iconCode}></WeatherIcon>
            </div>
            <div className="weather-weekly-forecast-segment__temperature">
                <Temperature tempInMetric={this.props.temp}></Temperature>
            </div>
        </div>;
    }
}