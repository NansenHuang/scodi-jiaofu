import ActionType from 'src/config/action-type';
import Services from 'src/services';
import Field from 'src/config/field';
import {getRequestFunc, delayRequest} from '../request-func';

export const actions = {
    // load actions
    [ActionType.LoadAlignment]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Alignment.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Alignment.id;
        let storePath = ['highway', 'alignment', 'alignment'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadBlignment]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Blignment.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Blignment.id;
        let storePath = ['highway', 'alignment', 'blignment'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadClignment]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Clignment.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Clignment.id;
        let storePath = ['highway', 'alignment', 'clignment'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadSideBlinddrain]: function (context, payload = {}) {
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
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadCrossBlinddrain]: function (context, payload = {}) {
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
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadChain]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Chain.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Chain.id;
        let storePath = ['highway', 'alignment', 'chain'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay).then((data) => {
            context.commit(ActionType.BuildChainIntervalTree);
            return Promise.resolve(data);
        });
    },
    [ActionType.LoadGuardwall]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Guardwall.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Guardwall.id;
        let storePath = ['highway', 'alignment', 'guardwall'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadInterchange]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Interchange.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Interchange.id;
        let storePath = ['highway', 'alignment', 'interchange'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadParkinglot]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Parkinglot.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Parkinglot.id;
        let storePath = ['highway', 'alignment', 'parkinglot'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadServicearea]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Servicearea.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Servicearea.id;
        let storePath = ['highway', 'alignment', 'servicearea'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadSoftbase]: function (context, payload = {}) {
        let queryFunc = Services.Alignment.Softbase.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Softbase.id;
        let storePath = ['highway', 'alignment', 'softbase'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    // add actions
    [ActionType.AddAlignment]: function (context, payload) {
        return Services.Alignment.Alignment.add(payload);
    },
    [ActionType.AddBlignment]: function (context, payload) {
        return Services.Alignment.Blignment.add(payload);
    },
    [ActionType.AddClignment]: function (context, payload) {
        return Services.Alignment.Clignment.add(payload);
    },
    [ActionType.AddSideBlinddrain]: function (context, payload) {
        return Services.Alignment.Blinddrain.add(payload);
    },
    [ActionType.AddCrossBlinddrain]: function (context, payload) {
        return Services.Alignment.Blinddrain.add(payload);
    },
    [ActionType.AddChain]: function (context, payload) {
        return Services.Alignment.Chain.add(payload);
    },
    [ActionType.AddGuardwall]: function (context, payload) {
        return Services.Alignment.Guardwall.add(payload);
    },
    [ActionType.AddInterchange]: function (context, payload) {
        return Services.Alignment.Interchange.add(payload);
    },
    [ActionType.AddParkinglot]: function (context, payload) {
        return Services.Alignment.Parkinglot.add(payload);
    },
    [ActionType.AddServicearea]: function (context, payload) {
        return Services.Alignment.Servicearea.add(payload);
    },
    [ActionType.AddSoftbase]: function (context, payload) {
        return Services.Alignment.Softbase.add(payload);
    },
    // update actions
    [ActionType.UpdateAlignment]: function (context, payload) {
        return Services.Alignment.Alignment.update(payload);
    },
    [ActionType.UpdateBlignment]: function (context, payload) {
        return Services.Alignment.Blignment.update(payload);
    },
    [ActionType.UpdateClignment]: function (context, payload) {
        return Services.Alignment.Clignment.update(payload);
    },
    [ActionType.UpdateSideBlinddrain]: function (context, payload) {
        return Services.Alignment.Blinddrain.update(payload);
    },
    [ActionType.UpdateCrossBlinddrain]: function (context, payload) {
        return Services.Alignment.Blinddrain.update(payload);
    },
    [ActionType.UpdateChain]: function (context, payload) {
        return Services.Alignment.Chain.update(payload);
    },
    [ActionType.UpdateGuardwall]: function (context, payload) {
        return Services.Alignment.Guardwall.update(payload);
    },
    [ActionType.UpdateInterchange]: function (context, payload) {
        return Services.Alignment.Interchange.update(payload);
    },
    [ActionType.UpdateParkinglot]: function (context, payload) {
        return Services.Alignment.Parkinglot.update(payload);
    },
    [ActionType.UpdateServicearea]: function (context, payload) {
        return Services.Alignment.Servicearea.update(payload);
    },
    [ActionType.UpdateSoftbase]: function (context, payload) {
        return Services.Alignment.Softbase.update(payload);
    },
    // delete actions
    [ActionType.DeleteAlignment]: function (context, payload) {
        return Services.Alignment.Alignment.delete(payload);
    },
    [ActionType.DeleteBlignment]: function (context, payload) {
        return Services.Alignment.Blignment.delete(payload);
    },
    [ActionType.DeleteClignment]: function (context, payload) {
        return Services.Alignment.Clignment.delete(payload);
    },
    [ActionType.DeleteSideBlinddrain]: function (context, payload) {
        return Services.Alignment.Blinddrain.delete(payload);
    },
    [ActionType.DeleteCrossBlinddrain]: function (context, payload) {
        return Services.Alignment.Blinddrain.delete(payload);
    },
    [ActionType.DeleteChain]: function (context, payload) {
        return Services.Alignment.Chain.delete(payload);
    },
    [ActionType.DeleteGuardwall]: function (context, payload) {
        return Services.Alignment.Guardwall.delete(payload);
    },
    [ActionType.DeleteInterchange]: function (context, payload) {
        return Services.Alignment.Interchange.delete(payload);
    },
    [ActionType.DeleteParkinglot]: function (context, payload) {
        return Services.Alignment.Parkinglot.delete(payload);
    },
    [ActionType.DeleteServicearea]: function (context, payload) {
        return Services.Alignment.Servicearea.delete(payload);
    },
    [ActionType.DeleteSoftbase]: function (context, payload) {
        return Services.Alignment.Softbase.delete(payload);
    },
};

export const mutations = {};
