function deleteServer(){
    var remote = require('electron').remote;
    const util = remote.getGlobal('vars');
    loadMainPage();
    util.deleteCurServer();
    document.getElementById("list").innerHTML = getMenuHTML();
}