import * as React from "react";
import { MeteoStore } from '../stores/meteo-store';
import { inject } from "mobx-react";

export interface MeteoProps {
    meteoStore?: MeteoStore;
    test: string;
}

@inject("meteoStore")
export class Meteo extends React.Component<MeteoProps> {
    render() {
        return <div className="meteo__title">
            <h1 className="meteo__title-title-1">Meteo</h1>
            <h2 className="meteo__title-title-2">{this.props.test}</h2>
            <h2>value is: {this.props.meteoStore!.imAlive}</h2>
        </div>;
    }
}