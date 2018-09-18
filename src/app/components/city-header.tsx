import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../stores/meteo-store";
import { CityAndBackButton } from "./city-and-back-button";
import { UnitsSwitch } from "./units-switch";

export interface CityHeaderProps {
    meteoStore?: MeteoStore;
}

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