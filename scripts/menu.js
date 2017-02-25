function getMenuHTML(){
    sessionArray.forEach(function(element){
        retur += '<li><a href="#session" onclick="sessionClick(this.id)" id=' + element.name + '>' + element.name + '</a></li>'
    });
}
function sessionClick(element){
    const util = require("../main.js");
    util.curOpenSession = util.getSessionIDFromName(element.name);
    var app = angular.module("EstiAccess", ["ngRoute"]);
    app.config(function($routeProvider) {
        $routeProvider
            .when("/session", {
                templateUrl : "../html/serverset.html"
            });
    });
}