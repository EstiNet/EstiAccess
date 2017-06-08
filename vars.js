const expor = module.exports = {};

expor.configureArray = [];
var Map = require("collections/map");
expor.sessionArray = new Map();
expor.curOpenSession = "none";
expor.sessionOnline = new Map();
expor.sockets = new Map();
expor.sessionLog = new Map();

expor.curOpenSessionFiles = "";

expor.chCache = {name: 'default', ip: 'default', port: 'default', pass: 'default'};

expor.version = "v1.0.0";

expor.getSessionNameFromID = function(id) {
    expor.sessionArray.forEach(function (element) {
        if(element.socketid == id){
            return element.name;
        }
    });
    return "idunoman";
};

expor.deleteCurServer = function(func){
    require('./storage.js').deleteSession(expor.curOpenSession, function(){
        for(var i = 0; i < expor.configureArray.length; i++){
            if(expor.configureArray[i].name == expor.curOpenSession){
                expor.configureArray.splice(i, 1);
            }
        }
        expor.sessionArray.delete(expor.curOpenSession);
        expor.sessionOnline.delete(expor.curOpenSession);
        expor.sockets.get(expor.curOpenSession).disconnect();
        expor.sockets.delete(expor.curOpenSession);
        expor.sessionLog.delete(expor.curOpenSession);
        func();
    });
};

expor.changeCurServer = function (func) {
    expor.deleteCurServer(function(){
        require('./storage.js').createSession(expor.chCache.name, expor.chCache.ip, expor.chCache.port, expor.chCache.pass, function(){
            func();
        });
    });
};

expor.requestCurServerFiles = function (directory, func) {
    //console.log('infunc ' + expor.curOpenSession);
    expor.sockets.get(expor.curOpenSession).emit('curdir', directory, function(data){
        //console.log('recieve callback ' + data);
        var array = data.split(" ");
        var retur = [];
        for(var str in array){
            var ar = array[str].split(":");
            retur.push({name: ar[0], size: ar[1], isDir: ar[2]});
        }
        func(retur);
    });
};

expor.downloadFile = function(element, func, everfunc){

};

expor.uploadFile = function(element, func, everfunc){
    for(var i = 0; i < element.length; i++) {
        var data = element[i];
        var directory = expor.sessionArray.get(expor.curOpenSession).curDirectory;
        var FileReader = require('filereader'), reader = new FileReader();
        reader.setNodeChunkedEncoding(true || false);
        reader.readAsArrayBuffer(data);
        reader.addEventListener('load', function (ev) {
            "`"
            var strarray = [], lstr = ev.target.result.toString('base64');
            if(lstr.length > 10000){
                var enroute = -1;
                for(var i = 0; i < lstr.length; i++){
                    if(i%10000 == 0){
                        strarray.push("");
                        enroute++;
                    }
                    strarray[enroute] += lstr.charAt(i);
                }
            }
            if (directory.charAt(directory.length - 1) == '/') {
                if(lstr.length <= 10000){
                    expor.sockets.get(expor.curOpenSession).emit('upload', directory + data.name + " " + lstr, function (ret) {
                        //DETECT IF DATA IS BAD (ecerror)
                        if(ret == "uploadcontinue"){
                            expor.sockets.get(expor.curOpenSession).emit('uploadgood')
                        }
                        func();
                    });
                }
                else{
                    var index = 0;
                    function check(ret){
                        //DETECT IF DATA IS BAD (ecerror)
                        if(ret == "uploadcontinue"){
                            if(index+1 == strarray.length){
                                expor.sockets.get(expor.curOpenSession).emit('uploadgood');
                                func();
                            }
                            else{
                                index++;
                                everfunc(index, strarray.length);
                                expor.sockets.get(expor.curOpenSession).emit('upload', directory + data.name + " " + strarray[index], check);
                            }
                        }
                        else{
                            func();
                        }
                    }
                    expor.sockets.get(expor.curOpenSession).emit('upload', directory + data.name + " " + strarray[index], check);
                }
            }
            else {
                if(lstr.length <= 10000) {
                    expor.sockets.get(expor.curOpenSession).emit('upload', directory + "/" + data.name + " " + lstr, function (ret) {
                        //DETECT IF DATA IS BAD (ecerror)
                        if(ret == "uploadcontinue"){
                            expor.sockets.get(expor.curOpenSession).emit('uploadgood')
                        }
                        func();
                    });
                }
                else{
                    var index = 0;
                    function check(ret){
                        //console.log("recieve callback " + ret);
                        //DETECT IF DATA IS BAD (ecerror)
                        if(ret == "uploadcontinue"){
                            if(index+1 == strarray.length){
                                expor.sockets.get(expor.curOpenSession).emit('uploadgood');
                                func();
                            }
                            else{
                                console.log('t4 upload', directory + "/" + data.name + " " + strarray[index]);
                                index++;
                                everfunc(index, strarray.length);
                                expor.sockets.get(expor.curOpenSession).emit('upload', directory + "/" + data.name + " " + strarray[index], check);
                            }
                        }
                        else{
                            func();
                        }
                    }
                    expor.sockets.get(expor.curOpenSession).emit('upload', directory + "/" + data.name + " " + strarray[index], check);
                }
            }
        });
    }
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
    socket.on('ecerror', function (data){
        console.log("[ECError] " + data)
    });
    socket.on('connect_error', function (data){
        console.log("[Error Connect] " + data + " " + socketOb.name);
    });
    socket.on('curlogs', function (data){
        var string = data;
        //string = string.replace(/(?:\r\n|\r|\n)/g, '<br />');
        string = string.replace(/(?:\r\n|\r|\n)/g, '\r');
        util.sessionLog.set(socketOb.name, string);
    });
    socket.on('log', function (data) {
        console.log("log: " + data);
        data = data + "";
        data = data.substring(data.indexOf(" ") + 1);
        util.sessionLog.set(socketOb.name, util.sessionLog.get(socketOb.name) + "\r" + data);
        const main = require('./main.js');
        if(util.curOpenSession == socketOb.name){
            main.mainWindow.webContents.send("updateConsole");
        }
    });
    socket.on('disconnect', function () {
        util.sessionOnline.set(socketOb.name, false);
    });
    util.sockets.set(socketOb.name, socket);
    util.sessionArray.set(socketOb.name,{'name': socketOb.name, 'ip': socketOb.ip, 'port': socketOb.port, 'password': socketOb.password, 'socketid': socket.id, 'curDirectory': './'});
    console.log("Finish method " + socketOb.name + "! " + util.sockets.keys());
    console.log(util.sessionArray);
    const stor = require('./storage.js');
    stor.fileScanN++;
};

expor.createDir = function(str, func){
    var directory = expor.sessionArray.get(expor.curOpenSession).curDirectory;
    if(directory.charAt(directory.length-1) == '/'){
        expor.sockets.get(expor.curOpenSession).emit('mkdir', directory + str, function(data){
            console.log(data);
            func();
        });
    }
    else{
        expor.sockets.get(expor.curOpenSession).emit('mkdir', directory + "/" + str, function(data){
            console.log(data);
            func();
        });
    }
};

var Base64 = {

// private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

// public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

// private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

// private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};


global.vars = expor;