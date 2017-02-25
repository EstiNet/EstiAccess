(function() {

    var HelloApp =
        ng.core
            .Component({
                selector: 'estiaccess',
                template: `<div id="wrapper">
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <li class="sidebar-brand">
                <a onclick="showMainMenu()" href="#"> EstiAccess! </a>
            </li>
            <div id="list" [innerHTML]="htmlStuff">{{htmlStuff}}</div>
        </ul>
    </div>
    <div id="page-content-wrapper">
        <div class="container-fluid" id="container-f">
        </div>
    </div>
</div>
<hr />`
            })
            .Class({
                constructor: function() {
                    this.htmlStuff = getMenuHTML("./vars.js");
                }
            });

    document.addEventListener('DOMContentLoaded', function() {
        ng.platformBrowserDynamic.bootstrap(HelloApp);
    });

})();