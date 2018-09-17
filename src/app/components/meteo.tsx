import * as React from "react";
import { MeteoStore } from '../stores/meteo-store';
import { inject } from "mobx-react";
import { CityInput } from "./city-input";

export interface MeteoProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
export class Meteo extends React.Component<MeteoProps> {
    render() {
        return <div className="meteo">
            <CityInput cityName={this.props.meteoStore!.GetCity()}></CityInput>
        </div>;
    }
}