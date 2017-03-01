const expor = module.exports = {};

expor.configureArray = [{'name': 'test', 'ip': 'localhost', 'port': '1', 'password': 'help'}];
expor.sessionArray = [];
expor.curOpenSession = -1;
expor.sessionOnline = [];
expor.sockets = [];
expor.sessionLog = [];

expor.getSessionIDFromName = function (name) {
    expor.sessionArray.forEach(function (element) {
        if (element.name == name) {
            return element.socketid;
        }
    });
    return -1;
};

expor.startSocket = function (socketOb) {
    const util = require('./vars.js');
    var socket = require('./node_modules/socket.io-client')('http://' + socketOb.ip + ":" + socketOb.port);
    socket.on('connect', function () {
        util.sessionOnline[socket.id] = true;
        socket.emit('hello', socketOb.password, function (data) {
            if (data.equals("authed")) {
                console.log("Connected!");
                util.sessionOnline[socket.id] = true;
                socket.emit('curlogs', function (data) {
                    util.sessionLog[socket.id] = data;
                });
            }
            else {
                console.log("Failed to connect!");
            }
        });
    });
    socket.on('log', function (data) {
        util.sessionLog[socket.id] += data;
    });
    socket.on('disconnect', function () {
        util.sessionOnline[socket.id] = false;
    });
    util.sockets[socket.id] = socket;
    util.sessionOnline[socket.id] = false;
    util.sessionLog[socket.id] = "";
    util.sessionArray[socket.id] = {'name': socketOb.name, 'ip': socketOb.ip, 'port': socketOb.port, 'socketid': socket.id};
    socket.connect();
};