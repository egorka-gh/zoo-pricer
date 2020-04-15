/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'

import { createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        main: 10
    },
    modules,
    plugins: [
        //createPersistedState(),
        createSharedMutations()
    ],
    mutations: {
        incRoot(state) {
            state.main++;
        }
    },
    actions: {
        checkout({ commit }) {
            console.log('checkout');
            commit('incRoot');
        }
    },
    strict: true //process.env.NODE_ENV !== 'production'
})