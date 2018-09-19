import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../stores/meteo-store";

export interface WeatherNameProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class WeatherName extends React.Component<WeatherNameProps> {
    render() {
        return <div className="weather-name">
            {this.props.meteoStore!.GetWeatherName()}
        </div>;
    }
}