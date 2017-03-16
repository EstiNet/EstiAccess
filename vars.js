const expor = module.exports = {};

expor.configureArray = [];
var Map = require("collections/map");
expor.sessionArray = new Map();
expor.curOpenSession = "none";
expor.sessionOnline = new Map();
expor.sockets = new Map();
expor.sessionLog = new Map();

expor.curOpenSessionFiles = "";

expor.chCache = {name: 'default', ip: 'default', port: 'default', pass: 'default'};

expor.version = "v1.0.0";

expor.getSessionNameFromID = function(id) {
    expor.sessionArray.forEach(function (element) {
        if(element.socketid == id){
            return element.name;
        }
    });
    return "idunoman";
};

expor.deleteCurServer = function(func){
    require('./storage.js').deleteSession(expor.curOpenSession, function(){
        for(var i = 0; i < expor.configureArray.length; i++){
            if(expor.configureArray[i].name == expor.curOpenSession){
                expor.configureArray.splice(i, 1);
            }
        }
        expor.sessionArray.delete(expor.curOpenSession);
        expor.sessionOnline.delete(expor.curOpenSession);
        expor.sockets.get(expor.curOpenSession).disconnect();
        expor.sockets.delete(expor.curOpenSession);
        expor.sessionLog.delete(expor.curOpenSession);
        func();
    });
};

expor.changeCurServer = function (func) {
    expor.deleteCurServer(function(){
        require('./storage.js').createSession(expor.chCache.name, expor.chCache.ip, expor.chCache.port, expor.chCache.pass, function(){
            func();
        });
    });
};

expor.requestCurServerFiles = function (directory, func) {
    console.log('infunc ' + expor.curOpenSession);
    expor.sockets.get(expor.curOpenSession).emit('curdir', directory, function(data){
        console.log('recieve callback ' + data);
        var array = data.split(" ");
        var retur = [];
        for(var str in array){
            var ar = array[str].split(":");
            retur.push({name: ar[0], size: ar[1], isDir: ar[2]});
        }
        func(retur);
    });
};

expor.startSocket = function (socketOb) {
    const util = require('./vars.js');
    console.log("Starting connection with " + socketOb.name + " " + socketOb.ip + " " + socketOb.port + "...");

    var socket = require('socket.io-client')('http://' + socketOb.ip + ':' + socketOb.port, {transports: ['websocket']});
    util.sessionOnline.set(socketOb.name, false);
    util.sessionLog.set(socketOb.name, "");
    socket.on('connect', function () {
        console.log("Found connection with " + socketOb.name + "!");
        util.sessionOnline[expor.getSessionNameFromID(socket.id)] = true;
        socket.emit('hello', socketOb.password);
    });
    socket.on('authed', function() {
        console.log("Connected!");
        util.sessionOnline.set(socketOb.name, true);
        socket.emit('curlogs', 'gimme');
    });
    socket.on('error', function (data){
        console.log("[Error] " + data + " " + socketOb.name);
    });
    socket.on('ecerror', function (data){
       console.log("[ECError] " + data)
    });
    socket.on('connect_error', function (data){
        console.log("[Error Connect] " + data + " " + socketOb.name);
    });
    socket.on('curlogs', function (data){
        var string = data;
        //string = string.replace(/(?:\r\n|\r|\n)/g, '<br />');
        string = string.replace(/(?:\r\n|\r|\n)/g, '\r');
        util.sessionLog.set(socketOb.name, string);
    });
    socket.on('log', function (data) {
        console.log("log: " + data);
        data = data + "";
        data = data.substring(data.indexOf(" ") + 1);
        util.sessionLog.set(socketOb.name, util.sessionLog.get(socketOb.name) + "\r" + data);
        const main = require('./main.js');
        if(util.curOpenSession == socketOb.name){
            main.mainWindow.webContents.send("updateConsole");
        }
    });
    socket.on('disconnect', function () {
        util.sessionOnline.set(socketOb.name, false);
    });
    util.sockets.set(socketOb.name, socket);
    util.sessionArray.set(socketOb.name,{'name': socketOb.name, 'ip': socketOb.ip, 'port': socketOb.port, 'password': socketOb.password, 'socketid': socket.id, 'curDirectory': './'});
    console.log("Finish method " + socketOb.name + "! " + util.sockets.keys());
    console.log(util.sessionArray);
    const stor = require('./storage.js');
    stor.fileScanN++;
};

global.vars = expor;