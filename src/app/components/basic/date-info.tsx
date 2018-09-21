import * as React from "react";
import { observer, inject } from "mobx-react";
import { MeteoStore } from "../../stores/meteo-store";

export interface DateInfoProps {
    meteoStore?: MeteoStore;
}

// this class is in charge of displaying the text name and date info in the top of the CityMeteo component.
@inject("meteoStore")
@observer
export class DateInfo extends React.Component<DateInfoProps> {
    render() {
        return <div className="date-info">
            <div className="date-info__day">{this.props.meteoStore!.GetDayOfWeek() + ","}</div>
            <div className="date-info__month">{this.props.meteoStore!.GetMonthOfYear()}</div>
            <div className="date-info__nominal-date">{this.props.meteoStore!.GetOrdinalDate()}</div>
            <div className="date-info__year">{this.props.meteoStore!.GetYear()}</div>
        </div>;
    }
}