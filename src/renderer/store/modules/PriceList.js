//mock data
const path = require('path');
const log = require('electron-log');

//mock data
//import items from '../mock/price.json'

const state = {
    folder: '',
    version: '',
    hide: true,
    items: []
}

const actions = {
    applyConfig({ commit }, config) {
        log.info('PriceList.applyConfig ', config);
        let newFolder = path.join(config.app.folder, config.app.id, 'price');
        if (!config.app.folder || !config.app.id) newFolder = '';
        commit('newConfigPr', {
            "folder": newFolder,
            "version": config.sync.price
        });
    },
    sync({ commit, state }, versions) {
        log.info('PriceList.sync ', versions, ', hide:', state.hide);
        if (!versions || !versions.price) return;
        commit('hiddenPr', true);
        if (!state.folder) return;
        const file = path.join(state.folder, versions.price, 'price.csv')
        const fs = require('fs');
        const parse = require('csv-parse/lib/sync')
        const columns = [
            "group_id",
            "group",
            "group_comment",
            "brand",
            "country",
            "name",
            "adv",
            "price"
        ]
        try {
            const content = fs.readFileSync(file);
            const records = parse(content, {
                columns: columns,
                delimiter: ';',
                skip_empty_lines: true,
                trim: true,
                bom: true
            });
            let group = "";
            let brand = "";
            records.forEach((rec, i) => {
                rec.id = i;
                rec.show_group = rec.group_id != group;
                rec.show_brand = rec.brand != brand;
            });
            commit('newVersionPr', { version: versions.price, items: records });
        } catch (error) {
            log.error(error);
        }
    }
}

const mutations = {
    newConfigPr(state, config) {
        state.hide = true;
        state.folder = config.folder;
        state.version = config.version;
    },
    newVersionPr(state, ver) {
        log.info('PriceList.newVersionPr ', ver);
        state.version = ver.version;
        state.items = ver.items;
        state.hide = false;
    },
    hiddenPr(state, value) {
        state.hide = value;
    }
}

export default {
    state,
    mutations,
    actions
}