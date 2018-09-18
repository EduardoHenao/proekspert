import * as React from "react";
import { observer, inject } from "mobx-react";
import { CityHeader } from "./city-header";
import { WeatherIcon } from "./weather-icon";
import { MeteoStore } from "../stores/meteo-store";

export interface CityMeteoProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class CityMeteo extends React.Component<CityMeteoProps> {
    render() {
        return <div className="city-meteo">
            <CityHeader></CityHeader>
            <WeatherIcon weatherCode={this.props.meteoStore!.GetIconCode()}></WeatherIcon>
        </div>;
    }
}