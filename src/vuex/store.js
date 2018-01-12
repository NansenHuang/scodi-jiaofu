import ActionType from '../config/action-type';

import { actions as AlignmentActions, mutations as AlignmentMutations } from './actions/alignment';
import { actions as StructureActions, mutations as StructureMutations } from './actions/structure';
import { actions as SectionActions, mutations as SectionMutations } from './actions/section';
import { actions as OtherActions, mutations as OtherMutations } from './actions/others';
import { actions as GraphyActions, mutations as GraphyMutations } from './actions/graphy';

function deepFind (obj, pathArray) {
    let current = obj;
    for (let i = 0; i < pathArray.length; i++) {
        if (current[pathArray[i]] === undefined) {
            return undefined;
        } else {
            current = current[pathArray[i]];
        }
    }
    return current;
}

const initStateString = JSON.stringify({
    highway: {
        basic: {
            alignment: [],
            chain: [],
            construct_section: [],
            interchange: [],
            servicearea: [],
            parkinglot: [],
        },
        section: {
            design: [],
            construction: [],
            custom: [],
        },
        alignment: {
            alignment: [],
            blignment: [],
            clignment: [],
            chain: [],
            interchange: [],
            servicearea: [],
            parkinglot: [],
            guardwall: [],
            crossblinddrain: [],
            sideblinddrain: [],
            softbase: [],
        },
        structure: {
            bridge: [],
            culvert: [],
            geology: [],
            tunnel: [],
            overbridge: [],
        },
        globalMessage: [],
        graphy: {},
        graphyCurrentPath: [],
        folderSelected: {},
        fileSelected: {},
        bindToModels: null,
    },
});

export const state = JSON.parse(initStateString);

export const mutations = {
    [ActionType.Append] (state, payload) {
        let target = deepFind(state, payload['path']);
        target.splice(target.length, 0, ...payload['data']);
    },
    [ActionType.Write] (state, payload) {
        let target = deepFind(state, payload['path']);
        target.splice(0, target.length, ...payload['data']);
    },
    [ActionType.ResetStoreData] (state, payload) {
        let newState = JSON.parse(initStateString);
        Object.keys(newState).map((key) => {
            state[key] = newState[key];
        });
    },
    [ActionType.GlobalMessage] (state, payload) {
        state['highway']['globalMessage'].push(payload);
    },
    ...AlignmentMutations,
    ...StructureMutations,
    ...SectionMutations,
    ...OtherMutations,
    ...GraphyMutations,
};

export const actions = {
    [ActionType.Write] ({commit}, payload) {
        commit({
            type: ActionType.Write,
            ...payload,
        });
    },
    [ActionType.Append] ({commit}, payload) {
        commit({
            type: ActionType.Append,
            ...payload,
        });
    },
    ...AlignmentActions,
    ...StructureActions,
    ...SectionActions,
    ...OtherActions,
    ...GraphyActions,
};
