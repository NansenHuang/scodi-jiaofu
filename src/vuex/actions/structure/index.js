import ActionType from 'src/config/action-type';
import Services from 'src/services';
import Field from 'src/config/field';
import {getRequestFunc, delayRequest} from '../request-func';

export const actions = {
    // load actions
    [ActionType.LoadBridge]: function ({commit}, payload = {}) {
        let queryFunc = Services.Structure.Bridge.query;
        let queryParams = payload.query;
        let recursive = true;
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
        let recursive = true;
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

export const mutations = {};
