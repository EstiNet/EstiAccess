
var storageService = function(){
    var self = this;

    self.indexStorage = function (){

        console.log("Indexing storage...")
        var fs = require('fs');
        var dir = './sessions';

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.readdir(dir, (err, files) => {
        files.forEach(file => {
        fs = require('fs')
        fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var ob = JSON.parse(data)
        global.sessionArray.push(ob)
        });
        });
    })
    console.log(global.sessionArray)
}

self.createSession = function (name, ip, port){
    var json = {'name': name, 'ip': ip, 'port': port}
    var fs = require('fs');
    fs.writeFile("sessions/" + name + ".json", json)
    self.sessionArray.push(json)
}
};
module.exports = storageService;