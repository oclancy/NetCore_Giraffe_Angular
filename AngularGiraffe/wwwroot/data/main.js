(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../dist/mycore/fesm5/mycore.js":
/*!**********************************************************************!*\
  !*** E:/Projects/Authentication/NetCore/dist/mycore/fesm5/mycore.js ***!
  \**********************************************************************/
/*! exports provided: ServiceState, SignalrClientService, DataService, AuthService, AuthGuard, CoreService, CoreComponent, CoreModule, OpenfinService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceState", function() { return ServiceState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignalrClientService", function() { return SignalrClientService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreService", function() { return CoreService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreComponent", function() { return CoreComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenfinService", function() { return OpenfinService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "../../node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_compiler_src_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/compiler/src/util */ "../../node_modules/@angular/compiler/src/util.js");
/* harmony import */ var _angular_compiler_src_util__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_angular_compiler_src_util__WEBPACK_IMPORTED_MODULE_5__);







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var ServiceState = {
    Unititialised: 0,
    Intialised: 1,
};
ServiceState[ServiceState.Unititialised] = 'Unititialised';
ServiceState[ServiceState.Intialised] = 'Intialised';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignalrClientService = /** @class */ (function () {
    function SignalrClientService() {
        this.Recieved = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.message = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.state = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    Object.defineProperty(SignalrClientService.prototype, "State", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} message
     * @return {?}
     */
    SignalrClientService.prototype.send = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.connection.invoke('Broadcast', message)
            .catch(function (err) { return console.error(err.toString()); });
        this.connection.invoke('Broadcast', 101)
            .catch(function (err) { return console.error(err.toString()); });
    };
    /**
     * @return {?}
     */
    SignalrClientService.prototype.start = /**
     * @return {?}
     */
    function () {
        //let connection = new signalR.HubConnection('/apphub');
        var _this = this;
        //let url = 'http://' + document.location.host + '/chat';
        //let connection = new signalR.HttpConnection(url, { transport: signalR.HttpTransportType.WebSockets, logger: signalR.LogLevel.Trace });
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/apphub")
            .build();
        this.connection.on('Send', function (data) {
            console.log(data);
            _this.Recieved.emit(data);
        });
        this.promise = this.connection.start();
        this.promise.catch(function (err) { return console.log(err); });
        this.promise.then(function () { return _this.state.next(ServiceState.Intialised); });
    };
    SignalrClientService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"] }
    ];
    /** @nocollapse */
    SignalrClientService.ctorParameters = function () { return []; };
    SignalrClientService.propDecorators = {
        Recieved: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }]
    };
    return SignalrClientService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.StateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    DataService.prototype.GetData = /**
     * @return {?}
     */
    function () {
        return this.http
            .post('/data', {})
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.handleError('getData', [])));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @private
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    DataService.prototype.handleError = /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @private
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])((/** @type {?} */ (result)));
        };
    };
    DataService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"] }
    ];
    /** @nocollapse */
    DataService.ctorParameters = function () { return [
        { type: _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"] }
    ]; };
    DataService.propDecorators = {
        StateChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }]
    };
    return DataService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.isLoggedIn = false;
        this.StateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.http
            .get("/auth")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }))
            .subscribe(function (data) {
            _this.isLoggedIn = data;
            _this.StateChanged.emit(_this.isLoggedIn);
        });
    }
    Object.defineProperty(AuthService.prototype, "IsLoggedIn", {
        get: /**
         * @return {?}
         */
        function () { return this.isLoggedIn; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    AuthService.prototype.login = /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    function (username, password) {
        /** @type {?} */
        var that = this;
        this.http
            .post("/login", JSON.stringify({ Username: username, Password: password }))
            .subscribe(function (response) {
            that.isLoggedIn = response.ok;
            that.StateChanged.emit(that.isLoggedIn);
            if (response.ok)
                that.router.navigate(["/"]);
        }, function (error) {
            that.isLoggedIn = false;
            that.StateChanged.emit(that.isLoggedIn);
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.logout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.http
            .get("/logout")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { if (res.ok)
            _this.router.navigate(["/"]); }));
    };
    AuthService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"] }
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
    ]; };
    AuthService.propDecorators = {
        StateChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }]
    };
    return AuthService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    AuthGuard.prototype.canActivate = /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    function (next, state) {
        /** @type {?} */
        var url = state.url;
        return this.checkLogin(url);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    AuthGuard.prototype.checkLogin = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (this.authService.IsLoggedIn) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.RedirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['login']);
        return false;
    };
    AuthGuard.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: AuthService },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
    ]; };
    /** @nocollapse */ AuthGuard.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["defineInjectable"])({ factory: function AuthGuard_Factory() { return new AuthGuard(Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["inject"])(AuthService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["inject"])(_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); }, token: AuthGuard, providedIn: "root" });
    return AuthGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CoreService = /** @class */ (function () {
    function CoreService() {
    }
    CoreService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CoreService.ctorParameters = function () { return []; };
    /** @nocollapse */ CoreService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["defineInjectable"])({ factory: function CoreService_Factory() { return new CoreService(); }, token: CoreService, providedIn: "root" });
    return CoreService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CoreComponent = /** @class */ (function () {
    function CoreComponent() {
    }
    /**
     * @return {?}
     */
    CoreComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    CoreComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                    selector: 'lib-Core',
                    template: "\n    <p>\n      core works!\n    </p>\n  "
                }] }
    ];
    /** @nocollapse */
    CoreComponent.ctorParameters = function () { return []; };
    return CoreComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"], args: [{
                    imports: [],
                    declarations: [CoreComponent],
                    exports: [CoreComponent]
                },] }
    ];
    return CoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OpenfinService = /** @class */ (function () {
    function OpenfinService(sendUuid, listenUuid) {
        this.sendUuid = sendUuid;
        this.listenUuid = listenUuid;
        if (Object(_angular_compiler_src_util__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(fin)) {
            this.application = fin.desktop.Application.getCurrent();
            //this.contextMenu = new fin.desktop.Window(
            //    {
            //        frame: false,
            //        name: "data_context_menu2",
            //        url: "data/assets/context-menu.html",
            //        minWidth: 50,
            //        minHeight: 45,
            //        maxWidth: 50,
            //        maxHeight: 45,
            //        saveWindowState: false,
            //    },
            //    function () {
            //    },
            //    function (error) {
            //        console.log("Error creating window:", error);
            //    });
        }
    }
    /**
     * @param {?} topic
     * @param {?} data
     * @return {?}
     */
    OpenfinService.prototype.Publish = /**
     * @param {?} topic
     * @param {?} data
     * @return {?}
     */
    function (topic, data) {
        fin.desktop
            .InterApplicationBus
            .send(this.sendUuid, topic, data, function () { return console.info("published ${data}, to ${topic}"); });
    };
    /**
     * @param {?} topic
     * @param {?} callback
     * @return {?}
     */
    OpenfinService.prototype.Subscribe = /**
     * @param {?} topic
     * @param {?} callback
     * @return {?}
     */
    function (topic, callback) {
        fin.desktop
            .InterApplicationBus
            .subscribe(this.listenUuid, topic, callback, function () { return console.info("subscribed ${sender}, to ${topic}"); });
    };
    /**
     * @param {?} manifestUrl
     * @return {?}
     */
    OpenfinService.prototype.Launch = /**
     * @param {?} manifestUrl
     * @return {?}
     */
    function (manifestUrl) {
        fin.desktop
            .Application
            .createFromManifest(manifestUrl, function () {
            console.info("Launched data");
        }, function (err) {
            console.error(err);
        });
    };
    /**
     * @return {?}
     */
    OpenfinService.prototype.Hide = /**
     * @return {?}
     */
    function () {
        //var context: fin.OpenFinWindow = this.contextMenu;
        //this.application.setTrayIcon(
        //    this.favIcoPath,
        //    function (clickInfo: fin.TrayIconClickedEvent):void {
        //        //context.showAt(clickInfo.x, clickInfo.y);
        //    },
        //    function (): void {
        //        console.info("Set tray icon to ${ this.favIcoPath }")
        //    },
        //    function (err: any):void {
        //        console.error(err);
        //    });
        this.application.getWindow().hide();
    };
    OpenfinService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"] }
    ];
    /** @nocollapse */
    OpenfinService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"], args: ["SendUuid",] }] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"], args: ["ListenUuid",] }] }
    ]; };
    return OpenfinService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=mycore.js.map

/***/ }),

/***/ "../../node_modules/@angular/compiler/src sync recursive":
/*!**********************************************************************************!*\
  !*** E:/Projects/Authentication/NetCore/node_modules/@angular/compiler/src sync ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/@angular/compiler/src sync recursive";

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9kYXRhL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div>Data App</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_pump_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-pump.service */ "./src/app/data-pump.service.ts");



var AppComponent = /** @class */ (function () {
    function AppComponent(dataPumpService) {
        this.dataPumpService = dataPumpService;
        this.title = 'data';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'data-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_data_pump_service__WEBPACK_IMPORTED_MODULE_2__["DataPumpService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var mycore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mycore */ "../../dist/mycore/fesm5/mycore.js");






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]
            ],
            providers: [
                { provide: 'SendUuid', useValue: 'data-app' },
                { provide: 'ListenUuid', useValue: 'client-app' },
                { provide: 'favIcoPath', useValue: 'assets/favicon.ico' },
                mycore__WEBPACK_IMPORTED_MODULE_4__["SignalrClientService"],
                mycore__WEBPACK_IMPORTED_MODULE_4__["OpenfinService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            exports: []
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/data-pump.service.ts":
/*!**************************************!*\
  !*** ./src/app/data-pump.service.ts ***!
  \**************************************/
/*! exports provided: DataPumpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataPumpService", function() { return DataPumpService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var mycore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mycore */ "../../dist/mycore/fesm5/mycore.js");
/* harmony import */ var lokijs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lokijs */ "../../node_modules/lokijs/src/lokijs.js");
/* harmony import */ var lokijs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lokijs__WEBPACK_IMPORTED_MODULE_3__);





var DataPumpService = /** @class */ (function () {
    function DataPumpService(openFinSrv, signalRSrv) {
        var _this = this;
        this.openFinSrv = openFinSrv;
        this.signalRSrv = signalRSrv;
        this.db = new lokijs__WEBPACK_IMPORTED_MODULE_3__('', {});
        this.openFinSrv.Hide();
        this.collection = this.db.addCollection("stockDetails");
        //this.openFinSrv
        //    .Subscribe();
        this.signalRSrv
            .Recieved
            .next(function (data) {
            _this.collection.insertOne(data);
            _this.openFinSrv.Publish("stockDetails", _this.collection.changes);
        });
    }
    DataPumpService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [mycore__WEBPACK_IMPORTED_MODULE_2__["OpenfinService"],
            mycore__WEBPACK_IMPORTED_MODULE_2__["SignalrClientService"]])
    ], DataPumpService);
    return DataPumpService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Authentication\NetCore\projects\data\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map