'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');

// report crashes to the Electron project
require('crash-reporter').start();

// prevent window being GC'd
let mainWindow = null;

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        icon: 'icon.png'
    });

    mainWindow.loadUrl(`file://${__dirname}/webApp/app/index.html`);

    mainWindow.on('closed', function () {
        // deref the window
        // for multiple windows store them in an array
        mainWindow = null;
    });
});