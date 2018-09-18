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
        {/* if no info is loaded then load the start screen */}
        { !this.props.meteoStore!.isInfoLoaded && 
            <CityInput cityName={this.props.meteoStore!.GetCity()}></CityInput>
        }
        {/* else load the elements to show */}
        {this.props.meteoStore!.isInfoLoaded &&
            here start magic
        }
        </div>;
    }
}