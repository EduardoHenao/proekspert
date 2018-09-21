import * as React from "react";
import { MeteoStore } from '../stores/meteo-store'; 
import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import { IconSearch } from "./svg/icon-search";

export interface CityInputProps {
    meteoStore?: MeteoStore;
}

// this class represents the 1st screen, where the user eithers enters the city name or uses the geolocation link
// the other screen of the project is called CityMeteo
@inject("meteoStore")
@observer 
export class CityInput extends React.Component<CityInputProps> {
    @observable text: string = "";

    @action handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            this.handleClickIcon();
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.text = event.target.value;
    }

    handleClickIcon = () => {
        if(this.text.length > 0) {
            this.props.meteoStore!.LoadInfoByCityName(this.text);
        }
    }

    HandleGeoLocationLink = () => {
        this.props.meteoStore!.LoadFromGeoCoords();
    }

    render() {
        return <div className="city-input">
            <input type="text" name="city-input__input" className="city-input" placeholder={this.text} required-autocomplete="off" onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.handleChange(e)}/>
            <span className="underline"></span>
            <IconSearch className="city-input__icon" clickHandler={this.handleClickIcon}/>
            <div className="city-input__or">
                <div>or</div>
            </div>
            <div className="city-input__current-location-container">
                <div className="city-input__current-location-container__left">use my </div>
                <div className="city-input__current-location-container__right" onClick={this.HandleGeoLocationLink}>current location</div>
            </div>
        </div>
    }
}