const expor = module.exports = {};
expor.indexStorage = function () {
    const util = require('./vars.js');
    console.log("Indexing storage...");
    var fs = require('fs');
    var dir = './sessions';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.readdir(dir, (err, files) => {
        files.forEach(file => {
            fs = require('fs');
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var ob = JSON.parse(data);
                util.configureArray.push(ob)
            });
        });
    });
};

expor.createSession = function (name, ip, port, password) {
    const util = require('./vars.js');
    var json = {'name': name, 'ip': ip, 'port': port, 'password': password, 'socketid': -1};
    var fs = require('fs');
    fs.writeFile("sessions/" + name + ".json", json);
    util.sessionArray.push(json)
};
