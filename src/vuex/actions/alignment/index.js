import IntervalTree from 'interval-tree2';
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
    // load actions
    [ActionType.LoadAlignment]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Alignment.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Alignment.id;
        let storePath = ['highway', 'alignment', 'alignment'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadBlignment]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Blignment.query;
        let queryParams = payload.query;
        let recursive = true; // TODO true?
        let idField = Field.Blignment.id;
        let storePath = ['highway', 'alignment', 'blignment'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadClignment]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Clignment.query;
        let queryParams = payload.query;
        let recursive = true; // TODO true?
        let idField = Field.Clignment.id;
        let storePath = ['highway', 'alignment', 'clignment'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadSideBlinddrain]: function ({commit}, payload = {}) {
        let queryBody = {
            'query': {
                'bool': {
                    'filter': [
                        {
                            'match': {
                                'Data.type.keyword': 'MG',
                            },
                        },
                        {
                            'match': {
                                'Data.modelType.keyword': 'BGMG',
                            },
                        },
                    ],
                },
            },
        };
        let queryParams = {};
        Object.assign(queryParams, payload.query, queryBody);
        let queryFunc = Services.Alignment.Blinddrain.query;
        let recursive = payload.recursive;
        let idField = Field.SideBlinddrain.id;
        let storePath = ['highway', 'alignment', 'sideblinddrain'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadCrossBlinddrain]: function ({commit}, payload = {}) {
        let queryBody = {
            'query': {
                'bool': {
                    'filter': [
                        {
                            'match': {
                                'Data.type.keyword': 'MG',
                            },
                        },
                        {
                            'match': {
                                'Data.modelType.keyword': 'JJMG',
                            },
                        },
                    ],
                },
            },
        };
        let queryParams = {};
        Object.assign(queryParams, payload.query, queryBody);
        let queryFunc = Services.Alignment.Blinddrain.query;
        let recursive = payload.recursive;
        let idField = Field.CrossBlinddrain.id;
        let storePath = ['highway', 'alignment', 'crossblinddrain'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadChain]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Chain.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Chain.id;
        let storePath = ['highway', 'alignment', 'chain'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay).then((data) => {
            console.log('确保所有的断链已经加载完成：', data);
            commit(ActionType.BuildChainIntervalTree);
            return Promise.resolve(data);
        });
    },
    [ActionType.LoadGuardwall]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Guardwall.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Guardwall.id;
        let storePath = ['highway', 'alignment', 'guardwall'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadInterchange]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Interchange.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Interchange.id;
        let storePath = ['highway', 'alignment', 'interchange'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadParkinglot]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Parkinglot.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Parkinglot.id;
        let storePath = ['highway', 'alignment', 'parkinglot'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadServicearea]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Servicearea.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Servicearea.id;
        let storePath = ['highway', 'alignment', 'servicearea'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadSoftbase]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Softbase.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Softbase.id;
        let storePath = ['highway', 'alignment', 'softbase'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    // add actions
    [ActionType.AddAlignment]: function ({commit}, payload) {
        return Services.Alignment.Alignment.add(payload);
    },
    [ActionType.AddBlignment]: function ({commit}, payload) {
        return Services.Alignment.Blignment.add(payload);
    },
    [ActionType.AddClignment]: function ({commit}, payload) {
        return Services.Alignment.Clignment.add(payload);
    },
    [ActionType.AddSideBlinddrain]: function ({commit}, payload) {
        return Services.Alignment.Blinddrain.add(payload);
    },
    [ActionType.AddCrossBlinddrain]: function ({commit}, payload) {
        return Services.Alignment.Blinddrain.add(payload);
    },
    [ActionType.AddChain]: function ({commit}, payload) {
        return Services.Alignment.Chain.add(payload);
    },
    [ActionType.AddGuardwall]: function ({commit}, payload) {
        return Services.Alignment.Guardwall.add(payload);
    },
    [ActionType.AddInterchange]: function ({commit}, payload) {
        return Services.Alignment.Interchange.add(payload);
    },
    [ActionType.AddParkinglot]: function ({commit}, payload) {
        return Services.Alignment.Parkinglot.add(payload);
    },
    [ActionType.AddServicearea]: function ({commit}, payload) {
        return Services.Alignment.Servicearea.add(payload);
    },
    [ActionType.AddSoftbase]: function ({commit}, payload) {
        return Services.Alignment.Softbase.add(payload);
    },
    // update actions
    [ActionType.UpdateAlignment]: function ({commit}, payload) {
        return Services.Alignment.Alignment.update(payload);
    },
    [ActionType.UpdateBlignment]: function ({commit}, payload) {
        return Services.Alignment.Blignment.update(payload);
    },
    [ActionType.UpdateClignment]: function ({commit}, payload) {
        return Services.Alignment.Clignment.update(payload);
    },
    [ActionType.UpdateSideBlinddrain]: function ({commit}, payload) {
        return Services.Alignment.Blinddrain.update(payload);
    },
    [ActionType.UpdateCrossBlinddrain]: function ({commit}, payload) {
        return Services.Alignment.Blinddrain.update(payload);
    },
    [ActionType.UpdateChain]: function ({commit}, payload) {
        return Services.Alignment.Chain.update(payload);
    },
    [ActionType.UpdateGuardwall]: function ({commit}, payload) {
        return Services.Alignment.Guardwall.update(payload);
    },
    [ActionType.UpdateInterchange]: function ({commit}, payload) {
        return Services.Alignment.Interchange.update(payload);
    },
    [ActionType.UpdateParkinglot]: function ({commit}, payload) {
        return Services.Alignment.Parkinglot.update(payload);
    },
    [ActionType.UpdateServicearea]: function ({commit}, payload) {
        return Services.Alignment.Servicearea.update(payload);
    },
    [ActionType.UpdateSoftbase]: function ({commit}, payload) {
        return Services.Alignment.Softbase.update(payload);
    },

};

function IsNumber (val) {
    return typeof val === 'number' || typeof Number(val) === 'number';
};

function GetNumber (val) {
    return typeof val === 'number' ? val : Number(val);
};

export const mutations = {
    [ActionType.BuildChainIntervalTree] (state, payload) {
        let chainSrc = state['highway']['alignment']['chain'].map((storeItem) => {
            return {
                ...storeItem,
                ...JSON.parse(storeItem['config']),
            };
        });
        let longChain = chainSrc.filter(item => item['type'] === 'long');

        let itreeObject = {};
        longChain.map((item) => {
            if (IsNumber(item['station']) && IsNumber(item['measureStation']) && GetNumber(item['station']) < GetNumber(item['measureStation'])) {
                if (!itreeObject.hasOwnProperty(item['alignmentID'])) {
                    itreeObject[item['alignmentID']] = new IntervalTree(GetNumber(item['station']));
                }
                itreeObject[item['alignmentID']].add(GetNumber(item['station']), GetNumber(item['measureStation']) - 0.00001, item['id']);
            } else {
                // eslint-disable-next-line no-console
                console.error(`Failed to process this chain: \n${JSON.stringify(item, null, 4)}`);

                state['highway']['globalMessage'].push({
                    config: {
                        title: '长链未处理',
                        desc: `路线：${item['alignmentCnName']}<br/>测量桩号：${item['measureStation']}<br/>断链桩号：${item['station']}`,
                        duration: 5,
                    },
                    type: 'error',
                    timestamp: (new Date()).getTime(),
                });
            };
        });
        state['highway']['intervalTree'] = itreeObject;
        state['highway']['globalMessage'].push({
            config: {
                title: '断链数据准备完成！',
                duration: 5,
            },
            type: 'info',
            timestamp: (new Date()).getTime(),
        });
    },

};

export default actions;
