import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../../stores/meteo-store";
import { IconBack } from "../svg/icon-back";

export interface CityAndBackButtonProps {
    meteoStore?: MeteoStore;
}


// this component is a container for the city name and the back button
@inject("meteoStore")
@observer
export class CityAndBackButton extends React.Component<CityAndBackButtonProps> {
    handleClickIcon = () => {
        this.props.meteoStore!.UnloadInfo();
    }

    render() {
        return <div className="city-and-back-button">
            <IconBack className="city-and-back-button__icon" clickHandler={this.handleClickIcon}/>
            <h1 className="city-and-back-button__label">{this.props.meteoStore!.GetCityName()}</h1>
        </div>;
    }
}