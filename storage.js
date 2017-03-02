var jsonfile = require("jsonfile");
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
            file = "./sessions/" + file;
            fs = require('fs');
            const jsonFile = require('jsonfile');
            jsonfile.readFile(file, function(err, obj) {
                if (err) {
                    return console.log(err);
                }
                util.configureArray.push(obj)
            });
        });
    });
};

expor.createSession = function (name, ip, port, password) {
    const jsonFile = require('jsonfile');
    const util = require('./vars.js');
    var fs = require('fs');
    var dir = "sessions/" + name + ".json";
    if(!fs.existsSync(dir)){
        fs.openSync(dir, 'a');
    }
    var json = {'name': name, 'ip': ip, 'port': port, 'password': password};
    jsonFile.writeFile(dir, json, function (err) {
        if(err){
            console.error(err)
        }
    });
    util.configureArray.push(json);
    util.startSocket(json);
};
