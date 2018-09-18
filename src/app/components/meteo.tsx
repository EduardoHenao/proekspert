import * as React from "react";
import { MeteoStore } from '../stores/meteo-store';
import { inject, observer } from "mobx-react";
import { CityInput } from "./city-input";
import { CityMeteo } from "./city-meteo";

export interface MeteoProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class Meteo extends React.Component<MeteoProps> {
    render() {
        var isInfoLoaded = this.props.meteoStore!.isInfoLoaded;

        return <div className="meteo">
        {/* if no info is loaded then load the start screen */}
        { !isInfoLoaded && <CityInput cityName={this.props.meteoStore!.GetCity()}></CityInput>}
        {/* else load the elements to show */}
        { isInfoLoaded && <CityMeteo></CityMeteo>}
        </div>;
    }
}