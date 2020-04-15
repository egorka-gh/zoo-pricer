/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
const state = {
    folder: 'C:\\buff\\ads',
    version: '0000-00-00',
    hide: true,
    items: []
}

const mutations = {
    newVersion(state, ver) {
        console.log('newVersion ', ver);
        state.version = ver.version;
        //const newData = [];
        const path = require('path');
        const folder = path.join(state.folder, ver.version)
        state.items.length = 0;
        ver.files.forEach(element => {
            state.items.push({ name: element, path: "file://" + path.join(folder, element) });
        });
        state.hide = false;
        //state.items = newData;
    },
    hidden(state, value) {
        state.hide = value;
    }
}

const actions = {
    sync({ commit, state }, newVersion) {
        /*
            // max version (currentdate)
            const maxVer = new Date().toISOString().split('T')[0]
            */
        commit('hidden', true);
        console.log('sync ' + newVersion);
        if (!newVersion) return;
        const path = require('path');
        const folder = path.join(state.folder, newVersion)
        const fs = require('fs');
        fs.readdir(folder, (err, files) => {
            if (err) {
                console.log(err);
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