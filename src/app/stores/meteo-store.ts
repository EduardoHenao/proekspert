import {observable} from 'mobx';

export class MeteoStore {
    @observable imAlive = 'Im alive';

    GetCity = () : string | null => {
        // TODO: recover cookie
        return "Tallinn";
    }
}