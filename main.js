const electron = require('electron');
// Module to control application life.
const app = electron.app;

var ipcMain = electron;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const storage = require('./storage');
import * as sessionArray from "rxjs";

var exports = module.exports = {};

exports.sessionArray = [{'name': 'test', 'ip': 'localhost', 'port': '1', 'password': 'help', 'socketid': '0'}];
exports.curOpenSession = -1;
exports.sessionOnline = [];
exports.sessions = [];
exports.sessionLog = [];

exports.getSessionIDFromName = function (name) {
    sessionArray.forEach(function (element) {
        if (element.name == name) {
            return element.socketid;
        }
    });
    return null;
};


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

global.storageService = new storage();
global.storageService.indexStorage();
console.log("Indexed storage.");

function createWindow() {
    console.log("Creating window...");

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

global.sessionArray.forEach(function (element) {
    var socket = require('socket.io-client')('http://' + element.ip + ":" + global.port);
    socket.on('connect', function () {
        socket.emit('hello', element.password, function (data) {
            if (data.equals("authed")) {
                console.log("Connected!")
                global.sessionOnline[socket.id] = true;
                socket.emit('curlogs', function (data) {
                    global.sessionLog[socket.id] = data;
                });
            }
            else {
                console.log("Failed to connect!");
            }
        });
    });
    socket.on('log', function (data) {
        global.sessionLog[socket.id] += data;
    });
    socket.on('disconnect', function () {
        global.sessionOnline[socket.id] = false;
    })
    global.sessions[socket.id] = socket;
    global.sessionOnline[socket.id] = false;
    global.sessionLog[socket.id] = "";
    socket.connect();
});
