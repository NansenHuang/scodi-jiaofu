import Cherry from 'src/libs/cherry.js';

export default class Project {
    static add (name, creator, desc) {
        let data = {
            name,
            creator,
            desc,
        };
        return Cherry.post('/project/add', data);
    }

    static query (query = JSON.stringify({})) {
        let data = {
            query,
        };
        return Cherry.post('/project/query', data);
    }

    static delete (id) {
        let data = {
            id,
        };
        return Cherry.post('/project/delete', data);
    }
}
