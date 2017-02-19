var menuService = function(){
var self = this;
    self.getLi = function (){
    console.log("Calling getLi()")
    var retur = ""
    console.log(global.sessionArray);
    global.sessionArray.forEach(function(element){
        retur += '<li><a href="#">' + element.name + '</a></li>'
    });
    return retur
}
}
module.exports = menuService;