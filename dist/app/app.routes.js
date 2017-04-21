"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./modules/home/home.component");
// Route Configuration
exports.routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: '**', component: home_component_1.HomeComponent }
];
// Export
exports.Routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map