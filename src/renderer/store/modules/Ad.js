/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
const state = {
    folder: 'C:\\buff\\ads',
    version: '0000-00-00',
    items: [
        { path: '001' },
        { path: '002' },
        { path: '003' }
    ]
}

const mutations = {
    newVersion(state, ver) {
        console.log('newVersion ');
        console.log(ver);
        state.version = ver.version;
        const newData = [];
        const path = require('path');
        const folder = path.join(state.folder, ver.version)
        ver.files.forEach(element => {
            newData.push({ name: element, path: "file://" + path.join(folder, element) });
        });

        state.items = newData;
    }
}

const actions = {
    sync({ commit, state }, newVersion) {
        /*
            // max version (currentdate)
            const maxVer = new Date().toISOString().split('T')[0]
            */
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