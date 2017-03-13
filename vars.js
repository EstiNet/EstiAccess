const expor = module.exports = {};

expor.configureArray = [];
var Map = require("collections/map");
expor.sessionArray = new Map();
expor.curOpenSession = "none";
expor.sessionOnline = new Map();
expor.sockets = new Map();
expor.sessionLog = new Map();

expor.getSessionNameFromID = function(id) {
    expor.sessionArray.forEach(function (element) {
        if(element.socketid == id){
            return element.name;
        }
    });
    return "idunoman";
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
    socket.on('connect_error', function (data){
        console.log("[Error Connect] " + data + " " + socketOb.name);
    });
    socket.on('curlogs', function (data){
        var string = data;
        string = string.replace(/(?:\r\n|\r|\n)/g, '<br />');
        util.sessionLog.set(socketOb.name, string);
    });
    socket.on('log', function (data) {
        console.log("log: " + data);
        var string = data + "";
        string = string.replace(/(?:\r\n|\r|\n)/g, '<br />');
        util.sessionLog.set(socketOb.name, util.sessionLog.get(socketOb.name) + string);
    });
    socket.on('disconnect', function () {
        util.sessionOnline.set(socketOb.name, false);
    });
    util.sockets.set(socketOb.name, socket);
    util.sessionArray.set(socketOb.name,{'name': socketOb.name, 'ip': socketOb.ip, 'port': socketOb.port, 'socketid': socket.id});

    console.log("Finish method " + socketOb.name + "! " + util.sockets.keys());
    console.log(util.sessionArray);
    const stor = require('./storage.js');
    stor.fileScanN++;
};

global.vars = expor;