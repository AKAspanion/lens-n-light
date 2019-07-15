import axios from 'axios';


class DataService {
    constructor() {
        axios.defaults.baseURL = 'data.json';
        let service = axios.create();
        this._service = service;
    }
    _get() {
        return this._service
            .get();
    }
    getImages() {
        return this._get();
    }
}


export default new DataService;