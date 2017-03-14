function deleteServer(){
    var remote = require('electron').remote;
    const util = remote.getGlobal('vars');
    loadMainPage();
    util.deleteCurServer(function(){
        document.getElementById("list").innerHTML = getMenuHTML();
    });
}
function changeInfo(){
    var name = document.getElementById('seName').value, ip = document.getElementById('seIP').value, port = document.getElementById('sePort').value, pass = document.getElementById('sePass').value;
    var remote = require('electron').remote;
    loadMainPage();
    const util = remote.getGlobal('vars');
    util.chCache = {'name': name, 'ip': ip, 'port': port, 'pass': pass};
    util.changeCurServer(function(){
        document.getElementById("list").innerHTML = getMenuHTML();
        var jOb = {'id': name};
        sessionClick(jOb);
    });
}