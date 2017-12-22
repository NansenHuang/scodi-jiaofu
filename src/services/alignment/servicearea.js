import Cherry from 'src/libs/cherry.js';

export default class Servicearea {
    static add (data) {
        return Cherry.post('/model/servicearea/add', data);
    }

    static update (data) {
        return Cherry.post('/model/servicearea/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/servicearea/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/servicearea/delete', data);
    }
}
