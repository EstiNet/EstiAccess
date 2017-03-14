function deleteServer(){
    var remote = require('electron').remote;
    const util = remote.getGlobal('vars');
    loadMainPage();
    util.deleteCurServer(function(){
        document.getElementById("list").innerHTML = getMenuHTML();
    });
}
function changeInfo(){
    var name = document.getElementById('seName'), ip = document.getElementById('seIP'), port = document.getElementById('sePort'), pass = document.getElementById('sePass');
    var remote = require('electron').remote;
    loadMainPage();
    const util = remote.getGlobal('vars');
    util.changeCurServer({'name': name, 'ip': ip, 'port': pass, 'pass': pass}, function(){
        document.getElementById("list").innerHTML = getMenuHTML();
        var jOb = {'id': name};
        sessionClick(jOb);
    });
}