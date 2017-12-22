import Cherry from 'src/libs/cherry.js';

export default class Culvert {
    static add (data) {
        return Cherry.post('/model/culvert/add', data);
    }

    static update (data) {
        return Cherry.post('/model/culvert/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/culvert/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/culvert/delete', data);
    }
}
