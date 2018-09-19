import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../stores/meteo-store";
import { WeatherDayForecastSegment } from "./weather-day-forecast-segment";

export interface WeatherDayForecastProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class WeatherDayForecast extends React.Component<WeatherDayForecastProps> {
    render() {
        return <div className="weather-day-forecast">
            {this.props.meteoStore!.GetDayForecast().map(x => <WeatherDayForecastSegment daySegment={x.segmentOfDay} temp={x.temp}></WeatherDayForecastSegment> )}
        </div>;
    }
}