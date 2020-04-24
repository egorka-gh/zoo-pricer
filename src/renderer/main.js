import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
//import store from './store'
//const settings = require('electron').remote.require('electron-settings');
const log = require('electron-log');
const electron = require('electron')
const ipc = electron.ipcRenderer
const Mousetrap = require('mousetrap');
import data from './defaultData.json'
const settings = require('electron-settings');
const path = require('path');


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
    components: { App },
    data: data,
    computed: {
        app_data() {
            return { "ads": this.ads, "price": this.price };
        }
    },
    router,
    template: '<App :app_data="app_data"/>',
    mounted: function() {
        // eslint-disable-next-line no-console
        log.info('app mounted', this.$data);
        applyConfig();
        applySync(settings.get('sync'));
        if (!settings.get('app.id')) {
            router.replace('config');
        }
        ipc.send('startSync');
    }
});
vm.$mount('#app');

function applyConfig() {
    const config = settings.getAll();
    //ads
    let newFolder = path.join(config.app.folder, config.app.id, 'ads');
    if (!config.app.folder || !config.app.id) newFolder = '';
    vm.ads.hide = true;
    vm.ads.folder = newFolder;
    vm.ads.version = config.sync.ads;
    vm.ads.height = config.ads.height;
    vm.ads.interval = (config.ads.interval && config.ads.interval > 5) ? config.ads.interval * 1000 : 5000;
    vm.ads.showItems = (config.ads.items && config.ads.items > 2) ? config.ads.items : 2;
    //price
    newFolder = path.join(config.app.folder, config.app.id, 'price');
    if (!config.app.folder || !config.app.id) newFolder = '';
    vm.price.hide = true;
    vm.price.folder = newFolder;
    vm.price.version = config.sync.price;
}

function applySync(versions) {
    if (!versions) return;
    syncPrice(versions);
    syncAds(versions);
}


function syncPrice(versions) {
    //log.info('syncPrice', versions);
    if (!versions || !versions.price) return;
    vm.price.hide = true;
    if (!vm.price.folder) return;
    const file = path.join(vm.price.folder, versions.price, 'price.csv')
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
        records.forEach((rec, i, arr) => {
            rec.id = i;
            rec.show_group = rec.group_id != group;
            rec.show_brand = rec.brand != brand;
            group = rec.group_id;
            brand = rec.brand;
            //offset before group or brand
            rec.show_gap = false;
            if (i > 0) {
                arr[i - 1].show_gap = rec.show_group || rec.show_brand;
            }
        });
        vm.price.version = versions.price;
        vm.price.items = records;
        vm.price.hide = false;
        //log.info('syncPrice', vm.price.items);
    } catch (error) {
        log.error(error);
    }
}

function syncAds(versions) {
    log.info('syncAds ', versions);
    if (!versions || !versions.ads) return;
    vm.ads.hide = true;
    if (!vm.ads.folder) return;
    const folder = path.join(vm.ads.folder, versions.ads)
    const fs = require('fs');
    fs.readdir(folder, (err, files) => {
        if (err) {
            log.error(err);
            return;
        }
        vm.ads.version = versions.ads;
        let newItems = [];
        files.forEach(element => {
            newItems.push({ name: element, path: "file://" + path.join(vm.ads.folder, versions.ads, element) });
        });
        vm.ads.items = newItems;
        vm.ads.hide = false;
        log.info('syncAds ', vm.ads);
    });
}


ipc.on('sync', (event, versions) => {
    applySync(versions);
})

// shortcut to config
Mousetrap.bind(['command+c', 'ctrl+c'], function() {
    router.replace('config');

    // return false to prevent default browser behavior
    // and stop event from bubbling
    return false;
});