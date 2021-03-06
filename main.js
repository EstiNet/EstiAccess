const electron = require('electron');
// Module to control application life.
const app = electron.app;

var ipcMain = electron;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const util = require("./vars.js");
const storage = require("./storage.js");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//let mainWindow;

const expor = module.exports = {};
expor.mainWindow = null;

function createWindow() {
    storage.indexStorage();
    console.log("Indexed storage.");

    console.log(util.configureArray);

    util.configureArray.forEach(function(element){
        util.startSocket(element);
    });
    console.log("Creating window...");

    expor.mainWindow = new BrowserWindow({width: 800, height: 600, icon: "resources/logo.png"});

    // and load the index.html of the app.
    expor.mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'landing.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    //expor.mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    expor.mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        expor.mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron.app.on('ready', createWindow);

// Quit when all windows are closed.
electron.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

electron.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (expor.mainWindow === null) {
        createWindow()
    }
});