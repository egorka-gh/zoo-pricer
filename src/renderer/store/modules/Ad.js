/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
const path = require('path');
const log = require('electron-log');

const state = {
    folder: '',
    version: '',
    hide: true,
    height: 100,
    interval: 5000,
    showItems: 2,
    items: []
}

const mutations = {
    newVersionAd(state, ver) {
        //log.info('newVersionAd folder ', state.folder);
        //log.info('newVersionAd ', ver);
        state.version = ver.version;
        state.items.length = 0;
        ver.files.forEach(element => {
            state.items.push({ name: element, path: "file://" + path.join(state.folder, ver.version, element) });
        });
        state.hide = false;
        //log.info('newVersionAd hide:', state.hide);
    },
    hiddenAd(state, value) {
        state.hide = value;
    },
    newConfigAd(state, config) {
        state.hide = true;
        state.folder = config.folder;
        state.version = config.version;
        state.height = config.height;
        state.interval = config.interval;
        state.showItems = config.items;
        // log.info('newConfigAd ', state.folder, state.version);
    }
}

const actions = {
    applyConfig({ commit }, config) {
        //log.info('Ad.applyConfig ', config);
        let newFolder = path.join(config.app.folder, config.app.id, 'ads');
        if (!config.app.folder || !config.app.id) newFolder = '';
        commit('newConfigAd', {
            "folder": newFolder,
            "version": config.sync.ads,
            "height": config.ads.height,
            "interval": (config.ads.interval && config.ads.interval > 5) ? config.ads.interval * 1000 : 5000,
            "items": (config.ads.items && config.ads.items > 2) ? config.ads.items : 2
        });
    },
    sync({ commit, state }, versions) {
        // log.info('Ad.sync ', versions, ', hide:', state.hide);
        if (!versions || !versions.ads) return;
        commit('hiddenAd', true);
        if (!state.folder) return;
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