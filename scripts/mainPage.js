function loadMainPage(){
    const util = require(filenam);
    util.curOpenSession = "none";
    $( "#container-f" ).fadeOut(300, function(){
        $( "#container-f" ).load( "./html/mainPage.html", function() {
            $( "#container-f" ).fadeIn(300);
        });
    });
}