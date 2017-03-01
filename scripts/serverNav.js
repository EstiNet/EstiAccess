serverMenuOpen = "none";
function configureServer() {
    serverMenuOpen = "consoleLog";
    $("#container-f").fadeOut(200, function () {
        $("#container-f").load("./html/mainNav.html", function () {
            $("#consoleLog").load("./html/serverset.html", function () {
                $("#serverFiles").load("./html/serverFiles.html", function () {
                    $("#serverSettings").load("./html/serverSettings.html", function () {
                        $("#serverFiles").hide(function () {
                            $("#serverSettings").hide(function () {
                                $("#container-f").fadeIn(400);
                            });
                        });
                    });
                });
            });
        });
    });
}
function openConsoleLog() {
    $("#" + serverMenuOpen + "A").removeClass("active");
    $("#consoleLogA").addClass("active");
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