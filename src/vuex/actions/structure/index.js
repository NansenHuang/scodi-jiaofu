import Cookies from 'js-cookie';

import ActionType from 'src/config/action-type';
import Services from 'src/services';
import Field from 'src/config/field';

function getRequestFunc (commit, queryFunc, query = {}, recursive = false, idField, path) {
    return async function request (searchAfter, index = 0) {
        let queryParams = {
            size: 50,
            sort: [{Timestamp: {order: 'desc'}}],
            ...query,
        };
        if (searchAfter && searchAfter.length) {
            queryParams['search_after'] = searchAfter;
        };

        let resp = await queryFunc(Cookies.get('project'), JSON.stringify(queryParams));
        if (resp && resp['hits'] && resp['hits']['hits'] && resp['hits']['hits'].length) {
            let ids = [];
            let data = resp['hits']['hits'].map((item) => {
                ids.push(item['_source']['ID']);
                return {
                    [idField]: item['_source']['ID'],
                    ...item['_source']['Data'],
                };
            });
            commit({
                type: searchAfter && searchAfter.length ? ActionType.Append : ActionType.Write,
                path,
                data,
            });
            let sortArray = resp['hits']['hits'][resp['hits']['hits'].length - 1]['sort'];
            if (sortArray && sortArray.length && recursive) {
                // TODO 例外情况未处理：hits的结果中，sort为null??
                // console.log(`第${index}次递归调用的result: `, JSON.stringify(ids, null, 4));
                let result = await request(sortArray, index + 1);
                return Promise.resolve([ids].concat(result));
            } else {
                return Promise.resolve([ids]);
            };
        } else {
            return Promise.resolve([]);
        };
    };
};

function delayRequest (func, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            let result = await func();
            // console.log('最终的result: ', JSON.stringify(result, null, 4));
            resolve(result);
        }, delay ? 1500 : 0);
    });
};

const actions = {
    // load actions
    [ActionType.LoadBridge]: function ({commit}, payload = {}) {
        let queryFunc = Services.Structure.Bridge.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Bridge.id;
        let storePath = ['highway', 'structure', 'bridge'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadCulvert]: function ({commit}, payload = {}) {
        let queryFunc = Services.Structure.Culvert.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Culvert.id;
        let storePath = ['highway', 'structure', 'culvert'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadGeology]: function ({commit}, payload = {}) {
        let queryFunc = Services.Structure.Geology.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Geology.id;
        let storePath = ['highway', 'structure', 'geology'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadOverbridge]: function ({commit}, payload = {}) {
        let queryFunc = Services.Structure.Overbridge.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Overbridge.id;
        let storePath = ['highway', 'structure', 'overbridge'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadTunnel]: function ({commit}, payload = {}) {
        let queryFunc = Services.Structure.Tunnel.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Tunnel.id;
        let storePath = ['highway', 'structure', 'tunnel'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    // add actions
    [ActionType.AddBridge]: function ({commit}, payload) {
        return Services.Structure.Bridge.add(payload);
    },
    [ActionType.AddCulvert]: function ({commit}, payload) {
        return Services.Structure.Culvert.add(payload);
    },
    [ActionType.AddGeology]: function ({commit}, payload) {
        return Services.Structure.Geology.add(payload);
    },
    [ActionType.AddOverbridge]: function ({commit}, payload) {
        return Services.Structure.Overbridge.add(payload);
    },
    [ActionType.AddTunnel]: function ({commit}, payload) {
        return Services.Structure.Tunnel.add(payload);
    },
    // update actions
    [ActionType.UpdateBridge]: function ({commit}, payload) {
        return Services.Structure.Bridge.update(payload);
    },
    [ActionType.UpdateCulvert]: function ({commit}, payload) {
        return Services.Structure.Culvert.update(payload);
    },
    [ActionType.UpdateGeology]: function ({commit}, payload) {
        return Services.Structure.Geology.update(payload);
    },
    [ActionType.UpdateOverbridge]: function ({commit}, payload) {
        return Services.Structure.Overbridge.update(payload);
    },
    [ActionType.UpdateTunnel]: function ({commit}, payload) {
        return Services.Structure.Tunnel.update(payload);
    },
};

export default actions;
