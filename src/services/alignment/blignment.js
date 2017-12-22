import Cherry from 'src/libs/cherry.js';

export default class Blignment {
    static add (data) {
        return Cherry.post('/model/blignment/add', data);
    }

    static update (data) {
        return Cherry.post('/model/blignment/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/blignment/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/blignment/delete', data);
    }
}
