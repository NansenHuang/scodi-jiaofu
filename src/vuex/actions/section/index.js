import ActionType from 'src/config/action-type';
import Services from 'src/services';
import Field from 'src/config/field';
import {getRequestFunc, delayRequest} from '../request-func';

export const actions = {
    [ActionType.LoadConstructionSection]: function (context, payload = {}) {
        let queryFunc = Services.Section.Construction.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
        let idField = Field.Section.id;
        let storePath = ['highway', 'section', 'construction'];
        let loadMore = payload.loadMore;

        let request = getRequestFunc(context, queryFunc, queryParams, recursive, idField, storePath, loadMore);
        return delayRequest(request, payload.delay);
    },
    [ActionType.AddConstructionSection]: function (context, payload) {
        return Services.Section.Construction.add(payload);
    },
    [ActionType.UpdateConstructionSection]: function (context, payload) {
        return Services.Section.Construction.update(payload);
    },
    [ActionType.DeleteConstructionSection]: function (context, payload) {
        return Services.Section.Construction.delete(payload);
    },
};

export const mutations = {};
