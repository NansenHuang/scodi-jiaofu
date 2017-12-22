import Cherry from 'src/libs/cherry.js';

export default class Chain {
    static add (data) {
        return Cherry.post('/model/chain/add', data);
    }

    static update (data) {
        return Cherry.post('/model/chain/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/chain/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/chain/delete', data);
    }
}
