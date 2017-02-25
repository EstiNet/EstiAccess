
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
    });
    console.log(global.sessionArray)
}

self.createSession = function (name, ip, port, password){
    var json = {'name': name, 'ip': ip, 'port': port, 'password': password, 'socketid': -1};
    var fs = require('fs');
    fs.writeFile("sessions/" + name + ".json", json)
    self.sessionArray.push(json)

     var socket = require('socket.io-client')('http://' + ip + ":" + port);
socket.on('connect', function(){
  socket.emit('hello', password, function(data){
    if(data.equals("authed")){
      console.log("Connected!")
      global.sessionOnline[socket.id] = true;
      socket.emit('curlogs', function(data){
        global.sessionLog[socket.id] = data;
      });
    }
    else{
      console.log("Failed to connect!");
    }
  });
});
socket.on('log', function(data){
  global.sessionLog[socket.id] += data;
});
socket.on('disconnect', function(){
  global.sessionOnline[socket.id] = false;
})
global.sessions[socket.id] = socket;
global.sessionOnline[socket.id] = false;
global.sessionFromName[element.name] = socket.id;
global.sessionLog[socket.id] = "";
socket.connect();

}
};
module.exports = storageService;