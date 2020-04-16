'use strict'

import { app, BrowserWindow } from 'electron'
import defaults from './settings.json'
import store from '../renderer/store';
const settings = require('electron-settings');
const log = require('electron-log');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 900,
        useContentSize: true,
        width: 1800,
        webPreferences: {
            webSecurity: false
        }
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}


app.on('ready', createWindow)
app.on('ready', initApp)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

function initApp() {
    //check if config is valid
    if (!settings.has('app.id')) {
        //first run
        log.info('Create default settings')
        settings.setAll(defaults)
        settings.set('app.folder', app.getPath('userData'))
    }
    applyConfig();
    // setInterval(() => store.dispatch('someAsyncTask'), 2000);
    // setInterval(() => runSync(), 10000);
}

settings.watch('app.id', () => {
    settings.set('sync.ads', '');
    settings.set('sync.price', '');
    applyConfig();
});

function applyConfig() {
    store.dispatch('applyConfig', settings.getAll());
    //if (!settings.get('app.folder') || !settings.get('app.id'))  return;
    // setInterval(() => runSync(), 10000)
}

/*
let currSync = '01'

function runSync() {
    if (currSync == '01') {
        currSync = '02'
    } else {
        currSync = '01'
    }
    // console.log('currSync ', currSync);
    store.dispatch('sync', currSync);
}
*/

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */