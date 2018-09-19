import * as React from "react";
import { MeteoStore } from '../stores/meteo-store';
import { inject, observer } from "mobx-react";

export interface WeatherIconProps {
    meteoStore?: MeteoStore;
    weatherCode: string;
}

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