import * as React from "react";
import { MeteoStore } from '../stores/meteo-store'; 
import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import { IconSearch } from "./svg/icon-search";

export interface CityInputProps {
    meteoStore?: MeteoStore;
    cityName: string | null;
}

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
            this.props.meteoStore!.LoadInfo(this.text);
        }
    }

    render() {
        return <div className="city-input">
            <input type="text" name="city-input__input" className="city-input" placeholder={this.text} required-autocomplete="off" onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.handleChange(e)}/>
            <span className="underline"></span>
            <IconSearch className="city-input__icon" clickHandler={this.handleClickIcon}/>
        </div>
    }
}