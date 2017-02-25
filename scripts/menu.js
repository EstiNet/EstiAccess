function getMenuHTML(filename){
    const util = require(filename);
    console.log("yay");
    util.sessionArray.forEach(function(elements){
        console.log(elements);
        retur += '<li><a href="#session" onclick="sessionClick(elements)" id=' + elements.name + '>' + elements.name + '</a></li>'
    });
}
function sessionClick(element, filename){
    const util = require(filename);
    util.curOpenSession = util.getSessionIDFromName(element.name);
    const app = angular.module("apps", ["ngRoute"]);
    app.config(function($routeProvider) {
        $routeProvider
            .when("/session", {
                templateUrl : "../html/serverset.html"
            });
    });
}