import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../../stores/meteo-store";
import { WeatherDayForecastSegment } from "./weather-day-forecast-segment";

export interface WeatherDayForecastProps {
    meteoStore?: MeteoStore;
}

// this component maps each day of the intra day forecast into a forecast component
@inject("meteoStore")
@observer
export class WeatherDayForecast extends React.Component<WeatherDayForecastProps> {
    render() {
        return <div className="weather-day-forecast">
            {this.props.meteoStore!.GetDayForecast().map(x => <WeatherDayForecastSegment key={x.id} daySegment={x.name} temp={x.temp}></WeatherDayForecastSegment> )}
        </div>;
    }
}