import Cherry from 'src/libs/cherry.js';

export default class Overbridge {
    static add (data) {
        return Cherry.post('/model/overbridge/add', data);
    }

    static update (data) {
        return Cherry.post('/model/overbridge/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/overbridge/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/overbridge/delete', data);
    }
}
