//mock data
import items from '../mock/price.json'
const log = require('electron-log');

const state = {
    folder: 'C:\\buff\\price',
    version: '0000-00-00',
    items: items
}

const actions = {
    applyConfig({ commit }, config) {
        log.info('PriceList.applyConfig ', config);
        commit('newVersionPr', { version: config.sync.ads });
    }
}

const mutations = {
    newVersionPr(state, ver) {
        log.info('newVersion ', ver);
        state.version = ver.version;
    }
}

export default {
    state,
    mutations,
    actions
}