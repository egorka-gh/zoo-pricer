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
    newVersionAd(state, ver) {
        log.info('newVersion ', ver);
        state.version = ver.version;
        state.items.length = 0;
        ver.files.forEach(element => {
            state.items.push({ name: element, path: "file://" + path.join(state.folder, ver.version, element) });
        });
        state.hide = false;
    },
    hiddenAd(state, value) {
        state.hide = value;
    },
    newConfigAd(state, config) {
        state.hide = true;
        state.folder = config.folder;
        state.version = config.version;
    }
}

const actions = {
    applyConfig({ dispatch, commit }, config) {
        log.info('Ad.applyConfig ', config);
        commit('newConfigAd', {
            "folder": path.join(config.app.folder, config.app.id, 'ads'),
            "version": config.sync.ads
        });
        if (!config.app.folder || !config.app.id || !config.sync.ads) return;
        dispatch('syncAds', config.sync.ads);
    },
    sync({ commit, state }, versions) {
        log.info('Ad.sync ', versions);
        commit('hiddenAd', true);
        if (!versions || !versions.ads) return;
        const path = require('path');
        const folder = path.join(state.folder, versions.ads)
        const fs = require('fs');
        fs.readdir(folder, (err, files) => {
            if (err) {
                log.error(err);
                return;
            }
            commit('newVersionAd', { version: versions.ads, files: files });
        });
    }
}

export default {
    state,
    mutations,
    actions
}