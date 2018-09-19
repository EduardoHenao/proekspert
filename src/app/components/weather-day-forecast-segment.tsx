import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../stores/meteo-store";

export interface WeatherDayForecastSegmentProps {
    meteoStore?: MeteoStore;
    daySegment: string;
    temp: string;
}

@inject("meteoStore")
@observer
export class WeatherDayForecastSegment extends React.Component<WeatherDayForecastSegmentProps> {
    render() {
        return <div className="weather-day-forecast-segment">
            <div className="weather-day-forecast-segment__day-segment">{this.props.daySegment}</div>
            <div className="weather-day-forecast-segment__temp">{this.props.temp}</div>
        </div>;
    }
}