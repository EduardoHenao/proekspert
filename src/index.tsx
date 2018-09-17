import * as React from "react";
import * as ReactDom from "react-dom";
import { Meteo } from "./app/components/meteo";
import './styles.less';
import { MeteoStore } from './app/stores/meteo-store';
import { Provider } from 'mobx-react';

const meteoStore = new MeteoStore();

const root = (
    <Provider meteoStore={meteoStore}>
        <Meteo test="hey this is working" />
    </Provider>
);

ReactDom.render(root, document.getElementById("meteo"));