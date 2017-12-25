import Cherry from 'src/libs/cherry.js';

export default class Clignment {
    static add (data) {
        return Cherry.post('/model/clignment/add', data);
    }

    static update (data) {
        return Cherry.post('/model/clignment/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/clignment/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/clignment/delete', data);
    }
}
