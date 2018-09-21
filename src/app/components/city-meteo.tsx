import * as React from "react";
import { observer, inject } from "mobx-react";
import { CityHeader } from "./complex/city-header";
import { MeteoStore } from "../stores/meteo-store";
import { DateInfo } from "./basic/date-info";
import { WeatherName } from "./basic/weather-name";
import { WeatherDetails } from "./complex/weather-details";
import { WeatherWeeklyForecast } from "./complex/weather-weekly-forecast";

export interface CityMeteoProps {
    meteoStore?: MeteoStore;
}

// this class represents the 2nd screen of the project containing the actual meteo info
// the first screen is represented by CityInput
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