serverMenuOpen = "none";
function configureServer() {
    serverMenuOpen = "consoleLog";
    $("#container-f").fadeOut(120, function () {
        $("#container-f").load("./html/mainNav.html", function () {
            $("#consoleLog").load("./html/serverset.html", function () {
                $("#serverFiles").load("./html/serverFiles.html", function () {
                    $("#serverSettings").load("./html/serverSettings.html", function () {
                        $("#serverFiles").hide(function () {
                            updateLog();
                            document.getElementById('commandwindow').scrollTop = document.getElementById('commandwindow').scrollHeight;
                            document.getElementById('command').onkeypress = function(e){
                                if (!e) e = window.event;
                                var keyCode = e.keyCode || e.which;
                                if (keyCode == '13'){
                                    submitText();
                                    return false;
                                }
                            };
                            $("#serverSettings").hide(function () {
                                $("#container-f").fadeIn(300);
                            });
                        });
                    });
                });
            });
        });
    });
}
function updateLog() {
    var remote = require('electron').remote;
    let util = remote.getGlobal('vars');
    let str = util.sessionLog.get(util.curOpenSession);
    let b = false;
    console.log(document.getElementById('commandwindow').scrollTop + 5 + " " + document.getElementById('commandwindow').scrollHeight);
    if(document.getElementById('commandwindow').scrollTop+5 == document.getElementById('commandwindow').scrollHeight) b = true;
    if(str != undefined){
        str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        str = str.replacestring = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
        document.getElementById('commandwindow').innerHTML = str;
        if(b) document.getElementById('commandwindow').scrollTop = document.getElementById('commandwindow').scrollHeight;
    }
    else{
        document.getElementById(".-.");
    }
}
function openConsoleLog() {
    $("#" + serverMenuOpen + "A").removeClass("active");
    $("#consoleLogA").addClass("active");
    updateLog();
    document.getElementById('commandwindow').scrollTop = document.getElementById('commandwindow').scrollHeight;
    $("#" + serverMenuOpen).fadeOut(300, function () {
        $("#consoleLog").fadeIn(300);
        serverMenuOpen = "consoleLog";
    });
}
function openServerFiles() {
    $("#" + serverMenuOpen + "A").removeClass("active");
    $("#serverFilesA").addClass("active");
    $("#" + serverMenuOpen).fadeOut(300, function () {
        $("#serverFiles").fadeIn(300);
        serverMenuOpen = "serverFiles";
    });
}
function openServerSettings() {
    var remote = require('electron').remote;
    let util = remote.getGlobal('vars');
    document.getElementById('seName').value = util.sessionArray.get(util.curOpenSession).name;
    document.getElementById('seIP').value = util.sessionArray.get(util.curOpenSession).ip;
    document.getElementById('sePort').value = util.sessionArray.get(util.curOpenSession).port;
    document.getElementById('sePass').value = util.sessionArray.get(util.curOpenSession).password;
    $("#" + serverMenuOpen + "A").removeClass("active");
    $("#serverSettingsA").addClass("active");
    $("#" + serverMenuOpen).fadeOut(300, function () {
        $("#serverSettings").fadeIn(300);
        serverMenuOpen = "serverSettings";
    });
}