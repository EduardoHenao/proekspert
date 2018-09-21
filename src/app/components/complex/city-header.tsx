import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../../stores/meteo-store";
import { CityAndBackButton } from "../basic/city-and-back-button";
import { UnitsSwitch } from "../basic/units-switch";

export interface CityHeaderProps {
    meteoStore?: MeteoStore;
}

// this class represents the top part of the CityMeteo component.
// it contains the units switch, the city name and the back icon
@inject("meteoStore")
@observer
export class CityHeader extends React.Component<CityHeaderProps> {
    render() {
        return <div className="city-header">
            <CityAndBackButton></CityAndBackButton>
            <UnitsSwitch></UnitsSwitch>
        </div>;
    }
}