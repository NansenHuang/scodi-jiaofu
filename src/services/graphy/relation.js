import Cherry from 'src/libs/cherry.js';

export default class Relation {
    static addRelation (project, id, model, docs) {
        let data = {
            project,
            id,
            model,
            docs,
        };
        return Cherry.post('/drawing/relation/add', data);
    };

    static queryRelation (project, query = JSON.stringify({size: 50})) {
        let data = {
            project,
            query,
        };
        return Cherry.post('/drawing/relation/query', data);
    };

    static updateRelation (project, id, model, docs, timestamp) {
        let data = {
            project,
            id,
            model,
            docs,
            timestamp,
        };
        return Cherry.post('/drawing/relation/update', data);
    };

    static deleteRelation (project, id) {
        let data = {
            project,
            id,
        };
        return Cherry.post('/drawing/relation/delete', data);
    };

    static batchAddRelation (project, scenes) {
        let data = {
            project,
            scenes,
        };
        return Cherry.post('/drawing/relation/add/multi', data);
    };
}
