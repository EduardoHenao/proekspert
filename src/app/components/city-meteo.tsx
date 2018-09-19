import * as React from "react";
import { observer, inject } from "mobx-react";
import { CityHeader } from "./city-header";
import { MeteoStore } from "../stores/meteo-store";
import { DateInfo } from "./date-info";
import { WeatherName } from "./weather-name";
import { WeatherDetails } from "./weather-details";
import { WeatherWeeklyForecast } from "./weather-weekly-forecast";

export interface CityMeteoProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class CityMeteo extends React.Component<CityMeteoProps> {
    render() {
        return <div className="city-meteo">
            <CityHeader></CityHeader>
            <DateInfo></DateInfo>
            <WeatherName></WeatherName>
            <WeatherDetails></WeatherDetails>
            <WeatherWeeklyForecast></WeatherWeeklyForecast>
        </div>;
    }
}