import {delayRequest, getRequestFunc} from '../request-func';
import ActionType from 'src/config/action-type';
import Services from 'src/services';
import Field from 'src/config/field';

export const actions = {
    [ActionType.LoadBasicData_Alignment]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Alignment.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Alignment.id;
        let storePath = ['highway', 'basic', 'alignment'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadBasicData_Chain]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Chain.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Chain.id;
        let storePath = ['highway', 'basic', 'chain'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay).then((data) => {
            commit(ActionType.BuildChainIntervalTree);
            return Promise.resolve(data);
        });
    },
    [ActionType.LoadBasicData_ConstructionSection]: function ({commit}, payload = {}) {
        let queryFunc = Services.Section.Construction.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Section.id;
        let storePath = ['highway', 'basic', 'construct_section'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadBasicData_Interchange]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Interchange.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Interchange.id;
        let storePath = ['highway', 'basic', 'interchange'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadBasicData_Parkinglot]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Parkinglot.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Parkinglot.id;
        let storePath = ['highway', 'basic', 'parkinglot'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
    [ActionType.LoadBasicData_Servicearea]: function ({commit}, payload = {}) {
        let queryFunc = Services.Alignment.Servicearea.query;
        let queryParams = payload.query;
        let recursive = true;
        let idField = Field.Servicearea.id;
        let storePath = ['highway', 'basic', 'servicearea'];

        let request = getRequestFunc(commit, queryFunc, queryParams, recursive, idField, storePath);
        return delayRequest(request, payload.delay);
    },
};
