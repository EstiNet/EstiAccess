import {Component, View} from "angular2/core";

@Component({
    selector: 'estiaccess',
    template: `<div id="wrapper">
                    <div id="sidebar-wrapper">
                        <ul class="sidebar-nav">
                            <li class="sidebar-brand">
                                <a onclick="showMainMenu()" href="#"> EstiAccess! </a>
                            </li>
                        <div id="list"></div>
                        </ul>
                    </div>
                <div id="page-content-wrapper">
            <div class="container-fluid" id="container-f"></div>
        </div>
    </div>
    <hr />`
})

@View({

})

export class AppComponent {

}