import Utils from 'src/libs/util';
import Services from 'src/services';
import ActionType from 'src/config/action-type';
import {getRequestFunc2, delayRequest} from '../request-func';
import Cookies from 'js-cookie';

export const actions = {
    [ActionType.LoadFiles]: function (context, payload = {}) {
        let queryFunc = Services.Graphy.Manage.queryFile;
        let queryParams = payload.query;
        let recursive = true;
        let idField = 'id';
        let storePath = ['graphy', 'explore', 'data'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc2(context, queryFunc, queryParams, recursive, idField, storePath, loadMore,
            ActionType.AppendFiles, ActionType.WriteFiles);
        return delayRequest(request, payload.delay);
    },
    [ActionType.DeleteItems]: async function (context, payload) {
        let items = payload.items;
        for (let i = 0; i < items.length; i++) {
            let resp = await Services.Graphy.Manage.deleteFile(
                Cookies.get('project'),
                items[i].id,
                items[i].type,
                payload.path,
                [],
            );
            console.log(resp);
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 200);
            });
        };
        context.commit(ActionType.SetFolderSelection, {});
        context.commit(ActionType.SetFileSelection, {});
    },
    [ActionType.AddRelation]: async function (context, payload) {
        let resp = await Services.Graphy.Relation.addRelation(
            Cookies.get('project'),
            payload.id,
            payload.model,
            payload.docs,
        );
        console.log(resp);
    },
    [ActionType.AddRelations]: async function (context, payload) {
        let resp = await Services.Graphy.Relation.batchAddRelation(
            Cookies.get('project'),
            payload
        );
        console.log(resp);
    },
    [ActionType.DeleteRelation]: async function (context, payload) {
        let resp = await Services.Graphy.Relation.deleteRelation(
            Cookies.get('project'),
            payload.id,
        );
        console.log(resp);
    },
    [ActionType.QueryRelation]: async function (context, payload) {
        let queryFunc = Services.Graphy.Relation.queryRelation;
        let queryParams = payload.query;
        let recursive = true;
        let idField = 'id';
        let storePath = ['graphy', 'bind', 'data'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc2(context, queryFunc, queryParams, recursive, idField, storePath, loadMore,
            ActionType.AppendRelationQueryResult, ActionType.WriteRelationQueryResult);
        return delayRequest(request, payload.delay);
    },
};

export const mutations = {
    [ActionType.AppendFiles] (state, payload) {
        payload['data'].map((item) => {
            state['graphy']['explore']['data'] = {
                ...state['graphy']['explore']['data'],
                [item['Path']]: [
                    ...(state['graphy']['explore']['data'][item['Path']] || []),
                    item,
                ],
            };
        });
    },
    [ActionType.WriteFiles] (state, payload) {
        let cleared = {};
        payload['data'].map((item) => {
            if (!cleared[item['Path']]) {
                state['graphy']['explore']['data'][item['Path']] = [];
                cleared[item['Path']] = true;
            }
        });
        payload['data'].map((item) => {
            state['graphy']['explore']['data'] = {
                ...state['graphy']['explore']['data'],
                [item['Path']]: [
                    ...state['graphy']['explore']['data'][item['Path']],
                    item,
                ],
            };
        });
    },
    [ActionType.AppendRelationQueryResult] (state, payload) {
        payload['data'].map((item) => {
            let key = item['Data']['docs']['path'];
            state['graphy']['bind']['data'] = {
                ...state['graphy']['bind']['data'],
                [key]: [
                    ...(state['graphy']['bind']['data'][key] || []),
                    item,
                ],
            };
        });
    },
    [ActionType.WriteRelationQueryResult] (state, payload) {
        let cleared = {};
        payload['data'].map((item) => {
            let key = item['Data']['docs']['path'];
            if (!cleared[key]) {
                state['graphy']['bind']['data'][key] = [];
                cleared[key] = true;
            }
        });
        payload['data'].map((item) => {
            let key = item['Data']['docs']['path'];
            state['graphy']['bind']['data'] = {
                ...state['graphy']['bind']['data'],
                [key]: [
                    ...state['graphy']['bind']['data'][key],
                    item,
                ],
            };
        });
    },
    [ActionType.AppendPath] (state, payload) {
        state['graphy']['explore']['path'].push(payload);
    },
    [ActionType.SetPath] (state, payload) {
        state['graphy']['explore']['path'] = [...payload];
    },
    [ActionType.SetFolderSelection] (state, payload) {
        state['highway']['folderSelected'] = payload;
    },
    [ActionType.SetFileSelection] (state, payload) {
        state['highway']['fileSelected'] = payload;
    },
    [ActionType.BindModels] (state, payload) {
        state['highway']['bindToModels'] = payload;
    },
    [ActionType.SetLayout] (state, payload) {
        state['graphy']['explore']['layout'] = payload;
    },
};
