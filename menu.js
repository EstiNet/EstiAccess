var menuService = function(){
var self = this;
    self.getLi = function (){
        var remote = require('electron').remote; 
    console.log("Calling getLi()")
    var retur = ""
    console.log(remote.getGlobal('sessionArray'));
    remote.getGlobal('sessionArray').forEach(function(element){
        retur += '<li><a href="#">' + element.name + '</a></li>'
    });
    return retur
}
}
module.exports = menuService;