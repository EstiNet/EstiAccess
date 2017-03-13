function submitText(){
    var input = document.getElementById("command").getAttribute("value");
    var remote = require('electron').remote;
    const util = remote.getGlobal('vars');
    console.log(util.curOpenSession + "<-");
    console.log(util.sockets.length + " <__");
    util.sockets.get(util.curOpenSession).emit("command", input);
    document.getElementById("command").setAttribute("value", "");
}