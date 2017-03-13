serverMenuOpen = "none";
function configureServer() {
    serverMenuOpen = "consoleLog";
    $("#container-f").fadeOut(200, function () {
        $("#container-f").load("./html/mainNav.html", function () {
            $("#consoleLog").load("./html/serverset.html", function () {
                $("#serverFiles").load("./html/serverFiles.html", function () {
                    $("#serverSettings").load("./html/serverSettings.html", function () {
                        $("#serverFiles").hide(function () {
                            updateLog();
                            document.getElementById('command').onkeypress = function(e){
                                if (!e) e = window.event;
                                var keyCode = e.keyCode || e.which;
                                if (keyCode == '13'){
                                    console.log('yay');
                                    submitText();
                                    return false;
                                }
                                console.log('nay');
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
    const util = remote.getGlobal('vars');
    document.getElementById('commandwindow').innerHTML = util.sessionLog.get(util.curOpenSession);
    document.getElementById('commandwindow').scrollTop = document.getElementById('commandwindow').scrollHeight;
}
function openConsoleLog() {
    $("#" + serverMenuOpen + "A").removeClass("active");
    $("#consoleLogA").addClass("active");
    updateLog();
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
    $("#" + serverMenuOpen + "A").removeClass("active");
    $("#serverSettingsA").addClass("active");
    $("#" + serverMenuOpen).fadeOut(300, function () {
        $("#serverSettings").fadeIn(300);
        serverMenuOpen = "serverSettings";
    });
}