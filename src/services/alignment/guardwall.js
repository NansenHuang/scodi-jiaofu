import Cherry from 'src/libs/cherry.js';

export default class Guardwall {
    static add (data) {
        return Cherry.post('/model/guardwall/add', data);
    }

    static update (data) {
        return Cherry.post('/model/guardwall/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/guardwall/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/guardwall/delete', data);
    }
}
