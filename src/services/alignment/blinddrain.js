import Cherry from 'src/libs/cherry.js';

export default class Blinddrain {
    static add (data) {
        return Cherry.post('/model/blinddrain/add', data);
    }

    static update (data) {
        return Cherry.post('/model/blinddrain/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/blinddrain/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/blinddrain/delete', data);
    }
}
