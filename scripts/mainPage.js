function loadMainPage(){
    const util = require("./vars.js");
    util.curOpenSession = "none";
    $( "#container-f" ).fadeOut(300, function(){
        $( "#container-f" ).load( "./html/mainPage.html", function() {
            $( "#container-f" ).fadeIn(300);
        });
    });
}