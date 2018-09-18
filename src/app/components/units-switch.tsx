import * as React from "react";
import { MeteoStore } from '../stores/meteo-store';
import { inject, observer } from "mobx-react";

export interface UnitsSwitchProps {
    meteoStore?: MeteoStore;
}

@inject("meteoStore")
@observer
export class UnitsSwitch extends React.Component<UnitsSwitchProps> {
    handleClick = () => {
        this.props.meteoStore!.SwitchUnits();
    }

    render() {
        return <div className="units-switch" onClick={this.handleClick}>
            <div className="units-switch__container" onClick={this.handleClick}></div>
            <div className={this.props.meteoStore!.isMetric ? " units-switch__slider left" : " units-switch__slider right"} onClick={this.handleClick}>
                <div className="units-switch__slider--unit" onClick={this.handleClick}></div>
            </div>
            <div className={this.props.meteoStore!.isMetric ? "units-switch__c" : "units-switch__f"}>{this.props.meteoStore!.GetUnitsLabel}</div>
        </div>;
    }
}