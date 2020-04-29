import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
//import store from './store'
//const settings = require('electron').remote.require('electron-settings');
const log = require("electron-log");
const electron = require("electron");
const ipc = electron.ipcRenderer;
const Mousetrap = require("mousetrap");
import data from "./defaultData.json";
const settings = require("electron-settings");
const path = require("path");

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
var vm = new Vue({
    components: { App },
    data: data,
    computed: {
        app_data() {
            return this.$data;
        },
    },
    router,
    template: '<App :app_data="app_data" />',
    mounted: function() {
        // eslint-disable-next-line no-console
        log.info("app mounted", this.$data);
        this.applyConfig();
        this.applySync(settings.get("sync"));
        if (!settings.get("app.id")) {
            router.replace("config");
        }
        ipc.send("startSync");
    },
    methods: {
        newConfig: function(config) {
            log.info("newConfig ", config);
            if (settings.get("app.id") != config.app.id) {
                config.sync = { ads: "", price: "" };
            }
            settings.setAll(config);
            this.applyConfig();
            this.$router.replace("home");
            this.applySync(settings.get("sync"));
        },
        applyConfig: function() {
            const config = settings.getAll();
            //ads
            let newFolder = path.join(config.app.folder, config.app.id, "ads");
            if (!config.app.folder || !config.app.id) newFolder = "";
            this.ads.hide = true;
            this.ads.folder = newFolder;
            this.ads.version = config.sync.ads;
            this.ads.height = config.ads.height;
            this.ads.interval =
                config.ads.interval && config.ads.interval > 5 ?
                config.ads.interval * 1000 :
                5000;
            this.ads.showItems =
                config.ads.items && config.ads.items > 2 ? config.ads.items : 2;
            //price
            newFolder = path.join(config.app.folder, config.app.id, "price");
            if (!config.app.folder || !config.app.id) newFolder = "";
            this.price.hide = true;
            this.price.folder = newFolder;
            this.price.version = config.sync.price;
            //font sizes
            this.font.group1 =
                config.font.group1 > 0 ? config.font.group1 : data.font.group1;
            this.font.group2 =
                config.font.group2 > 0 ? config.font.group2 : data.font.group2;
            this.font.brand1 =
                config.font.brand1 > 0 ? config.font.brand1 : data.font.brand1;
            this.font.brand2 =
                config.font.brand2 > 0 ? config.font.brand2 : data.font.brand2;
            this.font.body = config.font.body > 0 ? config.font.body : data.font.body;
            this.font.gap = config.font.gap > 0 ? config.font.gap : data.font.gap;
        },

        applySync: function(versions) {
            if (!versions) return;
            this.syncPrice(versions);
            this.syncAds(versions);
        },

        syncPrice: function(versions) {
            //log.info('syncPrice', versions);
            if (!versions || !versions.price) return;
            this.price.hide = true;
            if (!this.price.folder) return;
            const file = path.join(this.price.folder, versions.price, "price.csv");
            const fs = require("fs");
            const parse = require("csv-parse/lib/sync");
            const columns = [
                "group_id",
                "group",
                "group_comment",
                "brand",
                "country",
                "name",
                "adv",
                "price",
            ];
            try {
                const content = fs.readFileSync(file);
                const records = parse(content, {
                    columns: columns,
                    delimiter: ";",
                    skip_empty_lines: true,
                    trim: true,
                    bom: true,
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
                this.price.version = versions.price;
                this.price.items = records;
                this.price.hide = false;
            } catch (error) {
                log.error(error);
            }
        },

        syncAds: function(versions) {
            log.info("syncAds ", versions);
            if (!versions || !versions.ads) return;
            this.ads.hide = true;
            if (!this.ads.folder) return;
            const folder = path.join(this.ads.folder, versions.ads);
            const fs = require("fs");
            fs.readdir(folder, (err, files) => {
                if (err) {
                    log.error(err);
                    return;
                }
                this.ads.version = versions.ads;
                let newItems = [];
                files.forEach((element) => {
                    newItems.push({
                        name: element,
                        path: "file://" + path.join(this.ads.folder, versions.ads, element),
                    });
                });
                this.ads.items = newItems;
                this.ads.hide = false;
                log.info("syncAds ", this.ads);
            });
        },
    },
});
vm.$mount("#app");

ipc.on("sync", (event, versions) => {
    vm.applySync(versions);
});

// shortcut to config
Mousetrap.bind(["command+c", "ctrl+c"], function() {
    router.replace("config");

    // return false to prevent default browser behavior
    // and stop event from bubbling
    return false;
});