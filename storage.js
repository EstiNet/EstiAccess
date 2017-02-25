var storageService = function () {
    var self = this;
    const util = require("./main.js");

    self.indexStorage = function () {

        console.log("Indexing storage...")
        var fs = require('fs');
        var dir = './sessions';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.readdir(dir, (err, files) => {
            files.forEach(file => {
                fs = require('fs')
                fs.readFile(file, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    var ob = JSON.parse(data)
                    util.sessionArray.push(ob)
                });
            });
        });
        console.log(util.sessionArray)
    }

    self.createSession = function (name, ip, port, password) {
        var json = {'name': name, 'ip': ip, 'port': port, 'password': password, 'socketid': -1};
        var fs = require('fs');
        fs.writeFile("sessions/" + name + ".json", json)
        util.sessionArray.push(json)

        var socket = require('./node_modules/socket.io-client')('http://' + ip + ":" + port);
        socket.on('connect', function () {
            socket.emit('hello', password, function (data) {
                if (data.equals("authed")) {
                    console.log("Connected!")
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
        })
        util.sessions[socket.id] = socket;
        util.sessionOnline[socket.id] = false;
        util.sessionLog[socket.id] = "";
        socket.connect();

    }
};
module.exports = storageService;