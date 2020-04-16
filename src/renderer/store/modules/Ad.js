/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
const path = require('path');
const log = require('electron-log');

const state = {
    folder: 'C:\\buff\\ads',
    version: '0000-00-00',
    hide: true,
    items: []
}

const mutations = {
    newVersion(state, ver) {
        log.info('newVersion ', ver);
        state.version = ver.version;
        const folder = path.join(state.folder, ver.version)
        state.items.length = 0;
        ver.files.forEach(element => {
            state.items.push({ name: element, path: "file://" + path.join(folder, element) });
        });
        state.hide = false;
    },
    hidden(state, value) {
        state.hide = value;
    },
    newConfig(state, config) {
        state.hide = true;
        state.folder = config.folder;
        state.version = config.version;
    }
}

const actions = {
    applyConfig({ dispatch, commit }, config) {
        log.info('Ad.applyConfig ', config);
        commit('Ad.newConfig', {
            "folder": path.join(config.app.folder, config.app.id, 'ads'),
            "version": config.sync.ads
        });
        if (!config.app.folder || !config.app.id || !config.sync.ads) return;
        dispatch('syncAds', config.sync.ads);
    },
    syncAds({ commit, state }, newVersion) {
        /*
            // max version (currentdate)
            const maxVer = new Date().toISOString().split('T')[0]
            */
        log.info('syncAds ', newVersion);
        commit('hidden', true);
        if (!newVersion) return;
        const path = require('path');
        const folder = path.join(state.folder, newVersion)
        const fs = require('fs');
        fs.readdir(folder, (err, files) => {
            if (err) {
                log.error(err);
                return;
            }
            commit('newVersion', { version: newVersion, files: files });
        });

    }
}

export default {
    state,
    mutations,
    actions
}