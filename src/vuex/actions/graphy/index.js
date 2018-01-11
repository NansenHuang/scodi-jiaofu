import Utils from 'src/libs/util';
import Services from 'src/services';
import ActionType from 'src/config/action-type';
import {getRequestFunc2, delayRequest} from '../request-func';

export const actions = {
    [ActionType.LoadFiles]: function (context, payload = {}) {
        let queryFunc = Services.Graphy.Manage.queryFile;
        let queryParams = payload.query;
        let recursive = true;
        let idField = 'id';
        let storePath = ['highway', 'graphy'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc2(context, queryFunc, queryParams, recursive, idField, storePath, loadMore,
            ActionType.AppendFiles, ActionType.WriteFiles);
        return delayRequest(request, payload.delay);
    },
    [ActionType.DeleteItems]: async function (context, payload) {
        context.commit(ActionType.SetFolderSelection, {});
        context.commit(ActionType.SetFileSelection, {});
        console.log('delete items: ', payload);
    },
};

export const mutations = {
    [ActionType.AppendFiles] (state, payload) {
        payload['data'].map((item) => {
            state['highway']['graphy'] = {
                ...state['highway']['graphy'],
                [item['Path']]: [
                    ...(state['highway']['graphy'][item['Path']] || []),
                    item,
                ],
            };
        });
    },
    [ActionType.WriteFiles] (state, payload) {
        let cleared = {};
        payload['data'].map((item) => {
            if (!cleared[item['Path']]) {
                state['highway']['graphy'][item['Path']] = [];
                cleared[item['Path']] = true;
            }
        });
        payload['data'].map((item) => {
            state['highway']['graphy'] = {
                ...state['highway']['graphy'],
                [item['Path']]: [
                    ...state['highway']['graphy'][item['Path']],
                    item,
                ],
            };
        });
    },
    [ActionType.SetPath] (state, payload) {
        state['highway']['graphyCurrentPath'] = payload;
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
};
