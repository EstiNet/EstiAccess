var filenam = "";
function getMenuHTML(filename){
    filenam = filename;
    var remote = require('electron').remote;
    const util = remote.getGlobal('vars');
    var retur = "";
    util.configureArray.forEach(function(elements){ //oh shoot
        console.log(elements);
        retur += '<li><a href="#session" onclick=sessionClick(this) id=' + elements.name + '>' + elements.name + '</a></li>'
    });
    return retur;
}
function sessionClick(element){
    var remote = require('electron').remote;
    const util = remote.getGlobal('vars');
    util.curOpenSession = element.id;
    configureServer();
}
function close(){
    document.getElementById("alert").innerHTML = "";
    console.log("closing alert.");
}