var jsonfile = require("jsonfile");
const expor = module.exports = {};
expor.fileScanN = 0;
expor.indexStorage = function () {
    const util = require('./vars.js');
    console.log("Indexing storage...");
    var fs = require('fs');
    var dir = './sessions';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const mutil = require('./main.js');
    fs.readdir(dir, (err, files) => {
        console.log("Indexing " + fs);
        for(var i = 0; i <files.length; i++){
            var file = files[i];
            console.log(file);
            const jsonFile = require('jsonfile');
            jsonfile.readFile("./sessions/" + file, function(err, obj) {
                console.log(obj);
                if (err) {
                    return console.log(err);
                }
                util.configureArray.push(obj);
                util.startSocket(obj);
            });
        }
        console.log("Started all json searches.");
        function recursive(){
            if(expor.fileScanN < files.length && mutil.mainWindow != null){
                setTimeout(recursive, 1000);
            }
            else{
                setTimeout(load, 1000);
            }
        }
        function load(){
            const url = require('url');
            const path = require('path');
            mutil.mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
        recursive();
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

global.store = expor;
