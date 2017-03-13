function submitText(){
    var input = document.getElementById("command").value;
    if(input != ""){
        var remote = require('electron').remote;
        const util = remote.getGlobal('vars');
        document.getElementById("command").value = "";
        util.sockets.get(util.curOpenSession).emit("command", input);
    }
}