import Cherry from 'src/libs/cherry.js';

export default class Alignment {
    static add (data) {
        return Cherry.post('/model/alignment/add', data);
    }

    static update (data) {
        return Cherry.post('/model/alignment/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/alignment/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/alignment/delete', data);
    }
}
