'use strict'

import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import defaults from './settings.json'
import store from '../renderer/store'
import FtpHelper from './ftp-helper'

const settings = require('electron-settings');
const log = require('electron-log');
const path = require("path");

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
        frame: false,
        fullscreen: true,
        webPreferences: {
            webSecurity: false
        }
    })
    mainWindow.setMenu(null);
    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('ready', () => {
    // Register a 'CommandOrControl+X' shortcut listener.
    const ret = globalShortcut.register('CommandOrControl+X', () => {
        log.info('CommandOrControl+X is pressed. Closing app');
        app.quit()
    })

    if (!ret) {
        log.info('registration failed')
    }

    // Check whether a shortcut is registered.
    log.info(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
    // Unregister a shortcut.
    globalShortcut.unregister('CommandOrControl+X')

    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('initApp', (event) => {
    initApp();
    event.sender.send('initApp-reply', settings.get('app.id'));
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
    runSync();
}

settings.watch('app.id', () => {
    settings.set('sync.ads', '');
    settings.set('sync.price', '');
    applyConfig();
});

function applyConfig() {
    try {
        store.dispatch('applyConfig', settings.getAll())
            .then(store.dispatch('sync', settings.get('sync')));
    } catch (error) {
        log.error(error);
    }
}


function runSync() {
    //resync interval
    let interval = settings.get('ftp.interval')
    if (!interval || interval < 20) interval = 20;
    interval = process.env.NODE_ENV === 'development' ?
        interval * 1000 :
        interval * 60 * 1000;
    //check settings
    if (!settings.get('app.folder') || !settings.get('app.id') || !settings.get('ftp.host')) {
        //shedule
        setTimeout(() => runSync(), interval);
        return;
    }
    //check app.folder
    var fs = require('fs');
    if (!fs.existsSync(settings.get('app.folder'))) {
        //shedule
        setTimeout(() => runSync(), interval);
        return;
    }
    const localFolder = path.join(settings.get('app.folder'), settings.get('app.id'));
    const versions = { price: settings.get('sync.price'), ads: settings.get('sync.ads') };
    const ftpFolder = settings.get('ftp.folder') + '/' + settings.get('app.id');
    try {
        if (!fs.existsSync(localFolder)) fs.mkdirSync(localFolder);

        new FtpHelper(settings.get('ftp.host'), settings.get('ftp.user'), settings.get('ftp.pass'))
            .sync(versions, localFolder, ftpFolder)
            .then(r => {
                log.info('sync result:', r);
                if (r) {
                    if (r.ads) settings.set('sync.ads', r.ads)
                    if (r.price) settings.set('sync.price', r.price)
                    store.dispatch('sync', r);
                }
            });
    } catch (error) {
        log.error(error);
    }
    //shedule
    setTimeout(() => runSync(), interval);
}


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