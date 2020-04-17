import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
//const settings = require('electron').remote.require('electron-settings');
const log = require('electron-log');
const electron = require('electron')
const ipc = electron.ipcRenderer

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
    mounted: function() {
        // eslint-disable-next-line no-console
        log.info('app mounted');
        /*
        if (!settings.get('app.id')) {
            router.replace('config');
        }
        */
        ipc.send('initApp');
    }
}).$mount('#app');

ipc.on('initApp-reply', (event, newid) => {
    if (!newid) {
        router.replace('config');
    }
})