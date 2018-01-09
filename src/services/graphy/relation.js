import Cherry from 'src/libs/cherry.js';

export default class Relation {
    static addRelation (project, type, id, model, docs) {
        let data = {
            project,
            type,
            id,
            model,
            docs,
        };
        return Cherry.post('/drawing/relation/add', data);
    };

    static queryRelation (project, type, query = JSON.stringify({size: 50})) {
        let data = {
            project,
            type,
            query,
        };
        return Cherry.post('/drawing/relation/query', data);
    };

    static updateRelation (project, type, id, model, docs, timestamp) {
        let data = {
            project,
            type,
            id,
            model,
            docs,
            timestamp,
        };
        return Cherry.post('/drawing/relation/update', data);
    };

    static deleteRelation (project, type, id) {
        let data = {
            project,
            type,
            id,
        };
        return Cherry.post('/drawing/relation/delete', data);
    };

    static batchAddRelation (project, type, scenes) {
        let data = {
            project,
            type,
            scenes,
        };
        return Cherry.post('/drawing/relation/add/multi', data);
    };
}
