import * as React from "react";
import { MeteoStore } from '../../stores/meteo-store';
import { inject, observer } from "mobx-react";

export interface WeatherIconProps {
    meteoStore?: MeteoStore;
    weatherCode: string;
}

// this class is used to bridge the api weather icon to its correct font icon
// please refer to the internal mapper inside getClassFromWeatherCode
@inject("meteoStore")
@observer
export class WeatherIcon extends React.Component<WeatherIconProps> {

    private getClass(): string {
        return this.props.meteoStore!.getClassFromWeatherCode(this.props.weatherCode);
    }

    render() {
        return <div className={this.getClass()}></div>
    }
}