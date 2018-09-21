import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../../stores/meteo-store";
import { computed } from "mobx";

export interface TemperatureProps {
    meteoStore?: MeteoStore;
    tempInMetric: number;
}

@inject("meteoStore")
@observer
export class Temperature extends React.Component<TemperatureProps> {

    CelsiusToFarenheit = (celsius: number): number => {
        return celsius*9/5+32;
    }

    @computed get temperature(): number {
        if(this.props.meteoStore!.isMetric) {
            return Math.ceil(this.props.tempInMetric);
        }
        var tempInImperial = this.CelsiusToFarenheit(this.props.tempInMetric);
        return Math.ceil(tempInImperial);
    }

    @computed get temperatureString(): string {
        return `${this.temperature} ${this.props.meteoStore!.GetUnitsLabel}`;
    }

    render() {
        return <div>
            {this.temperatureString}
        </div>;
    }
}