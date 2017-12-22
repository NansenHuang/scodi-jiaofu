import Cherry from 'src/libs/cherry.js';

export default class Tunnel {
    static add (data) {
        return Cherry.post('/model/tunnel/add', data);
    }

    static update (data) {
        return Cherry.post('/model/tunnel/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/tunnel/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/tunnel/delete', data);
    }
}
