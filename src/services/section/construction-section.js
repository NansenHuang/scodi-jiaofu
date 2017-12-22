import Cherry from 'src/libs/cherry.js';

export default class DesignSection {
    static add (data) {
        return Cherry.post('/model/section/construct/add', data);
    }

    static update (data) {
        return Cherry.post('/model/section/construct/update', data);
    }

    static query (project, query = JSON.stringify({})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/model/section/construct/query', data);
    }

    static delete (data) {
        return Cherry.post('/model/section/construct/delete', data);
    }
}
