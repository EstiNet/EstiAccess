function configureServer(){
    $("#data").fadeOut(300, function(){
       $("#container-f").hide();
       $("#container-f").load("./html/server")
    });
}
function openConsoleLog(){
    $( "#data" ).remove();
    $( "#container-f" ).load( "./html/serverset.html", function() {});
}
function openServerFiles(){
    $( "#data" ).remove();
    $( "#container-f" ).load( "./html/serverFiles.html", function() {});
}
function openServerSettings(){
    $( "#data" ).remove();
    $( "#container-f" ).load( "./html/serverSettings.html", function() {});
}