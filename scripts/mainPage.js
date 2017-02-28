function loadMainPage(){
    const util = require(filenam);
    util.curOpenSession = util.getSessionIDFromName(-1);
    $( "#data" ).remove();
    $( "#container-f" ).load( "./html/mainPage.html", function() {});
}