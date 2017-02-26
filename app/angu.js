(function () {

    var serverMenu = ng.core.Component({
        selector: 'serverMenu',
        templateUrl: './html/serverset.html'
    })
        .Class({
            constructor: function() {

            }
        });

    var HelloApp = ng.core.Component({
                selector: 'estiaccess',
                template: `<div id="wrapper">
                           <div id="sidebar-wrapper">
                           <ul class="sidebar-nav">
                                <li class="sidebar-brand">
                                    <a onclick="showMainMenu()" href="#">EstiAccess</a>
                                </li>
            <!--<ul style="overflow:hidden; overflow-y:scroll">-->
                <div id="list" [innerHTML]="htmlStuff"></div>
            <!--</ul>-->
            <li><a href="#"><span class="glyphicon glyphicon-plus" aria-hidden="true" style="left: 75px;"></span></a></li>
        </ul>
    </div>
    <div id="page-content-wrapper">
        <div class="container-fluid" id="container-f">
        //<router-outlet></router-outlet>
        </div>
    </div>
</div>
<hr />`
            })
            .Class({
                constructor: function(/*router*/) {
                    /*router.config([
                        //{ path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
                        { path: '/serverMenu', name: 'serverMenu', component: serverMenu }
                    ]);*/
                    this.htmlStuff = getMenuHTML("./vars.js");
                }
            });
    var routes = [
        { path: '/serverMenu', component: serverMenu }
    ];
    var routing = ng.router.RouterModule.forRoot(routes);
    document.addEventListener('DOMContentLoaded', function () {
        ng.platformBrowserDynamic.bootstrap(HelloApp);
    });

})();
