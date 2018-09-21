import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../../stores/meteo-store";
import { Temperature } from "../basic/temperature";

export interface WeatherDayForecastSegmentProps {
    meteoStore?: MeteoStore;
    daySegment: string;
    temp: number;
}

// this class represents each of the intra day forecast lines 
// to the mid right part of the screen
@inject("meteoStore")
@observer
export class WeatherDayForecastSegment extends React.Component<WeatherDayForecastSegmentProps> {
    render() {
        return <div className="weather-day-forecast-segment">
            <div className="weather-day-forecast-segment__day-segment">{this.props.daySegment}</div>
            <div className="weather-day-forecast-segment__temp">
                <Temperature tempInMetric={this.props.temp}></Temperature>
            </div>
        </div>;
    }
}