import Cherry from 'src/libs/cherry.js';

export default class Interchange {
    static add (data) {
        return Cherry.post('/model/interchange/add', data);
    }

    static update (data) {
        return Cherry.post('/model/interchange/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/interchange/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/interchange/delete', data);
    }
}
