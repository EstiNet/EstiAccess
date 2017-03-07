const expor = module.exports = {};

expor.configureArray = [{'name': 'test', 'ip': 'localhost', 'port': '1', 'password': 'help'}];
expor.sessionArray = require("collections/sorted-map");
expor.curOpenSession = "none";
expor.sessionOnline = require("collections/sorted-map");
expor.sockets = require("collections/sorted-map");
expor.sessionLog = require("collections/sorted-map");

expor.getSessionNameFromID = function(id) {
    expor.sessionArray.SortedMap(function (element) {
        if(element.socketid == id){
            return element.name;
        }
    });
    return "idunoman";
};

expor.startSocket = function (socketOb) {
    const util = require('./vars.js');
    console.log("Starting connection with " + socketOb.name + "...");
    var io = require('socket.io-client'), socket = io.connect('http://' + socketOb.ip, {port: socketOb.port});
    socket.on('connection', function () {
        console.log("Found connection with " + socketOb.name + "!");
        util.sessionOnline[expor.getSessionNameFromID(socket.id)] = true;
        socket.emit('hello', socketOb.password, function (data) {
            if (data.equals("authed")) {
                console.log("Connected!");
                util.sessionOnline.SortedMap().set(socketOb.name, true);
                socket.emit('curlogs', function (data) {
                    util.sessionLog.SortedMap().set(socketOb.name, data);
                });
            }
            else {
                console.log("Failed to connect!");
            }
        });
    });
    socket.on('log', function (data) {
        util.sessionLog.SortedMap().set(socketOb.name, data);
    });
    socket.on('disconnect', function () {
        util.sessionOnline.SortedMap().set(socketOb.name, false);
    });
    util.sockets.SortedMap().set(socketOb.name, socket);
    util.sessionOnline.SortedMap().set(socketOb.name, false);
    util.sessionLog.SortedMap().set(socketOb.name, "");
    util.sessionArray.SortedMap().set(socketOb.name,{'name': socketOb.name, 'ip': socketOb.ip, 'port': socketOb.port, 'socketid': socket.id});
    socket.connect();
    console.log("Finish method " + socketOb.name + "!");
    console.log(util.sessionArray);
};