import Cherry from 'src/libs/cherry.js';

export default class Bridge {
    static add (data) {
        return Cherry.post('/model/bridge/add', data);
    }

    static update (data) {
        return Cherry.post('/model/bridge/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/bridge/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/bridge/delete', data);
    }
}
