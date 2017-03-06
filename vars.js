const expor = module.exports = {};

expor.configureArray = [{'name': 'test', 'ip': 'localhost', 'port': '1', 'password': 'help'}];
expor.sessionArray = [];
expor.curOpenSession = -1;
expor.sessionOnline = [];
expor.sockets = [];
expor.sessionLog = [];

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
    console.log("Starting connection with " + socketOb.name + "...");
    var io = require('socket.io-client'), socket = io.connect('http://' + socketOb.ip, {port: socketOb.port});
    socket.on('connection', function () {
        console.log("Found connection with " + socketOb.name + "!");
        util.sessionOnline[expor.getSessionNameFromID(socket.id)] = true;
        socket.emit('hello', socketOb.password, function (data) {
            if (data.equals("authed")) {
                console.log("Connected!");
                util.sessionOnline[expor.getSessionNameFromID(socket.id)] = true;
                socket.emit('curlogs', function (data) {
                    util.sessionLog[expor.getSessionNameFromID(socket.id)] = data;
                });
            }
            else {
                console.log("Failed to connect!");
            }
        });
    });
    socket.on('log', function (data) {
        util.sessionLog[expor.getSessionNameFromID(socket.id)] += data;
    });
    socket.on('disconnect', function () {
        util.sessionOnline[expor.getSessionNameFromID(socket.id)] = false;
    });
    util.sockets[expor.getSessionNameFromID(socket.id)] = socket;
    util.sessionOnline[expor.getSessionNameFromID(socket.id)] = false;
    util.sessionLog[expor.getSessionNameFromID(socket.id)] = "";
    util.sessionArray[expor.getSessionNameFromID(socket.id)] = {'name': socketOb.name, 'ip': socketOb.ip, 'port': socketOb.port, 'socketid': socket.id};
    socket.connect();
    console.log("Finish method " + socketOb.name + "!");
    console.log(util.sessionArray);
};