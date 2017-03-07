var filenam = "";
function getMenuHTML(filename){
    filenam = filename;
    const util = require(filename);
    var retur = "";
    util.configureArray.forEach(function(elements){ //oh shoot
        console.log(elements);
        retur += '<li><a href="#session" onclick=sessionClick(this) id=' + elements.name + '>' + elements.name + '</a></li>'
    });
    return retur;
}
function sessionClick(element){
    const util = require(filenam);
    util.curOpenSession = element.name;
    configureServer();
}
function close(){
    document.getElementById("alert").innerHTML = "";
    console.log("closing alert.");
}