import ActionType from 'src/config/action-type';
import Services from 'src/services';
import Field from 'src/config/field';
import {getRequestFunc, delayRequest} from '../request-func';

export const actions = {
    // load actions
    [ActionType.LoadBridge]: function (context, payload = {}) {
        let queryFunc = Services.Structure.Bridge.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Bridge.id;
        let storePath = ['highway', 'structure', 'bridge'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadCulvert]: function (context, payload = {}) {
        let queryFunc = Services.Structure.Culvert.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Culvert.id;
        let storePath = ['highway', 'structure', 'culvert'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadGeology]: function (context, payload = {}) {
        let queryFunc = Services.Structure.Geology.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Geology.id;
        let storePath = ['highway', 'structure', 'geology'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadOverbridge]: function (context, payload = {}) {
        let queryFunc = Services.Structure.Overbridge.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Overbridge.id;
        let storePath = ['highway', 'structure', 'overbridge'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadTunnel]: function (context, payload = {}) {
        let queryFunc = Services.Structure.Tunnel.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Tunnel.id;
        let storePath = ['highway', 'structure', 'tunnel'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    // add actions
    [ActionType.AddBridge]: function (context, payload) {
        return Services.Structure.Bridge.add(payload);
    },
    [ActionType.AddCulvert]: function (context, payload) {
        return Services.Structure.Culvert.add(payload);
    },
    [ActionType.AddGeology]: function (context, payload) {
        return Services.Structure.Geology.add(payload);
    },
    [ActionType.AddOverbridge]: function (context, payload) {
        return Services.Structure.Overbridge.add(payload);
    },
    [ActionType.AddTunnel]: function (context, payload) {
        return Services.Structure.Tunnel.add(payload);
    },
    // update actions
    [ActionType.UpdateBridge]: function (context, payload) {
        return Services.Structure.Bridge.update(payload);
    },
    [ActionType.UpdateCulvert]: function (context, payload) {
        return Services.Structure.Culvert.update(payload);
    },
    [ActionType.UpdateGeology]: function (context, payload) {
        return Services.Structure.Geology.update(payload);
    },
    [ActionType.UpdateOverbridge]: function (context, payload) {
        return Services.Structure.Overbridge.update(payload);
    },
    [ActionType.UpdateTunnel]: function (context, payload) {
        return Services.Structure.Tunnel.update(payload);
    },
    // delete actions
    [ActionType.DeleteBridge]: function (context, payload) {
        return Services.Structure.Bridge.delete(payload);
    },
    [ActionType.DeleteCulvert]: function (context, payload) {
        return Services.Structure.Culvert.delete(payload);
    },
    [ActionType.DeleteGeology]: function (context, payload) {
        return Services.Structure.Geology.delete(payload);
    },
    [ActionType.DeleteOverbridge]: function (context, payload) {
        return Services.Structure.Overbridge.delete(payload);
    },
    [ActionType.DeleteTunnel]: function (context, payload) {
        return Services.Structure.Tunnel.delete(payload);
    },
};

export const mutations = {};
