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
                return Promise.resolve(data.concat(result));
            } else {
                return Promise.resolve(data);
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
    [ActionType.LoadConstructionSection]: function ({commit}, payload = {}) {
        let queryFunc = Services.Section.Construction.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Section.id;
        let storePath = ['highway', 'section', 'construction'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.AddConstructionSection]: function ({commit}, payload) {
        return Services.Section.Construction.add(payload);
    },
    [ActionType.UpdateConstructionSection]: function ({commit}, payload) {
        return Services.Section.Construction.update(payload);
    },
};

export default actions;
