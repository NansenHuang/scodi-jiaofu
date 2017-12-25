import ActionType from '../config/action-type';

import AlignmentAction, { mutations as AlignmentMutations } from './actions/alignment';
import StructureAction from './actions/structure';
import SectionAction from './actions/section';

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
    ...AlignmentAction,
    ...StructureAction,
    ...SectionAction,
};
