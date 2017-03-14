function deleteServer(){
    var remote = require('electron').remote;
    const util = remote.getGlobal('vars');
    loadMainPage();
    util.deleteCurServer(function(){
        document.getElementById("list").innerHTML = getMenuHTML();
    });
}
function changeInfo(){
    
}