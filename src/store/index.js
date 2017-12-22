import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

import { state as highwayState, mutations as highwayMutations, actions as highwayActions } from './vuex/store.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
        ...highwayState,
    },
    mutations: {
        //
        ...highwayMutations,
    },
    actions: {
        ...highwayActions,

    },
    modules: {
        app,
        user
    }
});

export default store;
