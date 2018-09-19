import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../stores/meteo-store";
import { WeatherWeeklyForecastSegment } from "./weather-weekly-forecast-segment";

export interface WeatherWeeklyForecastProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class WeatherWeeklyForecast extends React.Component<WeatherWeeklyForecastProps> {
    render() {
        return <div className="weather-weekly-forecast">
            {this.props.meteoStore!.GetWeekForecast().map(x => <WeatherWeeklyForecastSegment key={x.id} dayName={x.name} temp={x.temp} iconCode={x.iconCode}></WeatherWeeklyForecastSegment> )}
        </div>;
    }
}