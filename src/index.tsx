import * as React from "react";
import * as ReactDom from "react-dom";
import { Meteo } from "./app/components/meteo";
import './index.less';
import { MeteoStore } from './app/stores/meteo-store';
import { Provider } from 'mobx-react';

const meteoStore = new MeteoStore();

const root = (
    <Provider meteoStore={meteoStore}>
        <Meteo/>
    </Provider>
);

ReactDom.render(root, document.getElementById("meteo"));