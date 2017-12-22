import Cherry from 'src/libs/cherry.js';

export default class Parkinglot {
    static add (data) {
        return Cherry.post('/model/stop/add', data);
    }

    static update (data) {
        return Cherry.post('/model/stop/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/stop/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/stop/delete', data);
    }
}
