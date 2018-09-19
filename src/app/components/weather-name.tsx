import * as React from "react";
import { observer, inject } from "mobx-react";
import { CityHeader } from "./city-header";
import { MeteoStore } from "../stores/meteo-store";
import { DateInfo } from "./date-info";

export interface WeatherNameProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class WeatherName extends React.Component<WeatherNameProps> {
    render() {
        return <div className="city-meteo">
            <CityHeader></CityHeader>
            {/* <WeatherIcon weatherCode={this.props.meteoStore!.GetIconCode()}></WeatherIcon> */}
            <DateInfo></DateInfo>
            <WeatherName></WeatherName>
        </div>;
    }
}