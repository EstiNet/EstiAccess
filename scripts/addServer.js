function loadAddServer(){
    const util = require("./vars.js");
    util.curOpenSession = "none";
    $( "#container-f" ).fadeOut(300, function(){
        $( "#container-f" ).load( "./html/addServer.html", function() {
            $( "#container-f" ).fadeIn(300);
        });
    });
}
function verify(){
    var name = document.getElementById("uName").value;
    var ip = document.getElementById("uIP").value;
    var port = document.getElementById("uPort").value;
    var pass = document.getElementById("uPass").value;
    //const util = require("./vars.js");
    var remote = require('electron').remote;
    const util = remote.getGlobal('vars');
    if (name == "") {
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger alert-dismissible" onclick="close()" role="alert"><button type="button" class="close" data-dismiss="alert" onclick=close() aria-label="Close"><span onclick=close() aria-hidden="true">&times;</span></button>Name must be filled out.</div>';
        return false;
    }
    else if (util.getSessionNameFromID(name) != "idunoman") {
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" onclick="close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>Name already exists.</div>';
        return false;
    }
    else if (ip == "") {
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" onclick="close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>IP must be filled out.</div>';
        return false;
    }
    else if (port == "") {
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" onclick="close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>Port must be filled out.</div>';
        return false;
    }
    else if (pass == "") {
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" onclick="close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>Password must be filled out.</div>';
        return false;
    }
    else{
        var storage = remote.getGlobal('store');
        storage.createSession(name, ip, port, pass);
        document.getElementById("alert").innerHTML = '<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" onclick="close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>Created a new server listing!</div>';
        document.getElementById('list').innerHTML = getMenuHTML("./vars.js");
        loadMainPage();
    }
}