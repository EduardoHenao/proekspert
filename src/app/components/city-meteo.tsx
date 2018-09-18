import * as React from "react";
import { observer } from "mobx-react";
import { CityHeader } from "./city-header";

@observer
export class CityMeteo extends React.Component {
    render() {
        return <div className="city-meteo">
            <CityHeader></CityHeader>
        </div>;
    }
}