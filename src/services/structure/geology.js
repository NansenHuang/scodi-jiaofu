import Cherry from 'src/libs/cherry.js';

export default class Geology {
    static add (data) {
        return Cherry.post('/model/geology/add', data);
    }

    static update (data) {
        return Cherry.post('/model/geology/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/geology/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/geology/delete', data);
    }
}
