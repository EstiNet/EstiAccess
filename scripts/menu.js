var filenam = "";
function getMenuHTML(filename){
    filenam = filename;
    const util = require(filename);
    var retur = "";
    util.sessionArray.forEach(function(elements){
        console.log(elements);
        retur += '<li><a href="#session" onclick=sessionClick(this) id=' + elements.name + '>' + elements.name + '</a></li>'
    });
    return retur;
}
function sessionClick(element){
    const util = require(filenam);
    util.curOpenSession = util.getSessionIDFromName(element.name);
    configureServer();
}