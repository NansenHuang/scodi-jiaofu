import ActionType from 'src/config/action-type';
import Services from 'src/services';
import Field from 'src/config/field';
import {getRequestFunc, delayRequest} from '../request-func';

export const actions = {
    // load actions
    [ActionType.LoadAlignment]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Alignment.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Alignment.id;
        let storePath = ['highway', 'alignment', 'alignment'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadBlignment]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Blignment.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Blignment.id;
        let storePath = ['highway', 'alignment', 'blignment'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadClignment]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Clignment.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
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
        let recursive = payload.recursive;
        let idField = Field.Chain.id;
        let storePath = ['highway', 'alignment', 'chain'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay).then((data) => {
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
        let recursive = payload.recursive;
        let idField = Field.Interchange.id;
        let storePath = ['highway', 'alignment', 'interchange'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadParkinglot]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Parkinglot.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Parkinglot.id;
        let storePath = ['highway', 'alignment', 'parkinglot'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadServicearea]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Servicearea.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
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

export const mutations = {};
