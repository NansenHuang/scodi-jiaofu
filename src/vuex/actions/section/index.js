import ActionType from 'src/config/action-type';
import Services from 'src/services';
import Field from 'src/config/field';
import {getRequestFunc, delayRequest} from '../request-func';

export const actions = {
    [ActionType.LoadConstructionSection]: function ({commit}, payload = {}) {
        let queryFunc = Services.Section.Construction.query;
        let queryParams = payload.query;
        let recursive = payload.recursive;
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

export const mutations = {};
