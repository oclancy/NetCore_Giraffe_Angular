(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/http'), require('rxjs/operators'), require('@angular/router'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('mycore', ['exports', 'rxjs', '@angular/http', 'rxjs/operators', '@angular/router', '@angular/core'], factory) :
    (factory((global.mycore = {}),global.rxjs,global.ng.http,global.rxjs.operators,global.ng.router,global.ng.core));
}(this, (function (exports,rxjs,http,operators,i2,i0) { 'use strict';

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
            this.Recieved = new i0.EventEmitter();
            this.message = new rxjs.Subject();
            this.state = new rxjs.Subject();
        }
        Object.defineProperty(SignalrClientService.prototype, "State", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        SignalrClientService.ctorParameters = function () { return []; };
        SignalrClientService.propDecorators = {
            Recieved: [{ type: i0.Output }]
        };
        return SignalrClientService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DataService = /** @class */ (function () {
        function DataService(http$$1) {
            this.http = http$$1;
            this.StateChanged = new i0.EventEmitter();
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
                    .pipe(operators.map(function (res) { return res.json(); }), operators.catchError(this.handleError('getData', [])));
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
                if (operation === void 0) {
                    operation = 'operation';
                }
                return function (error) {
                    // TODO: send the error to remote logging infrastructure
                    console.error(error); // log to console instead
                    // TODO: better job of transforming error for user consumption
                    console.log(operation + " failed: " + error.message);
                    // Let the app keep running by returning an empty result.
                    return rxjs.of(( /** @type {?} */(result)));
                };
            };
        DataService.decorators = [
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        DataService.ctorParameters = function () {
            return [
                { type: http.Http }
            ];
        };
        DataService.propDecorators = {
            StateChanged: [{ type: i0.Output }]
        };
        return DataService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AuthService = /** @class */ (function () {
        function AuthService(http$$1, router) {
            var _this = this;
            this.http = http$$1;
            this.router = router;
            this.isLoggedIn = false;
            this.StateChanged = new i0.EventEmitter();
            this.http
                .get("/auth")
                .pipe(operators.map(function (res) { return res.json(); }))
                .subscribe(function (data) {
                _this.isLoggedIn = data;
                _this.StateChanged.emit(_this.isLoggedIn);
            });
        }
        Object.defineProperty(AuthService.prototype, "IsLoggedIn", {
            get: /**
             * @return {?}
             */ function () { return this.isLoggedIn; },
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
                    .pipe(operators.map(function (res) {
                    if (res.ok)
                        _this.router.navigate(["/"]);
                }));
            };
        AuthService.decorators = [
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        AuthService.ctorParameters = function () {
            return [
                { type: http.Http },
                { type: i2.Router }
            ];
        };
        AuthService.propDecorators = {
            StateChanged: [{ type: i0.Output }]
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
                this.router.navigate(['/login']);
                return false;
            };
        AuthGuard.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        AuthGuard.ctorParameters = function () {
            return [
                { type: AuthService },
                { type: i2.Router }
            ];
        };
        /** @nocollapse */ AuthGuard.ngInjectableDef = i0.defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0.inject(AuthService), i0.inject(i2.Router)); }, token: AuthGuard, providedIn: "root" });
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        CoreService.ctorParameters = function () { return []; };
        /** @nocollapse */ CoreService.ngInjectableDef = i0.defineInjectable({ factory: function CoreService_Factory() { return new CoreService(); }, token: CoreService, providedIn: "root" });
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
            { type: i0.Component, args: [{
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
    var MyCoreModule = /** @class */ (function () {
        function MyCoreModule() {
        }
        MyCoreModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [CoreComponent],
                        exports: [CoreComponent]
                    },] }
        ];
        return MyCoreModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.ServiceState = ServiceState;
    exports.SignalrClientService = SignalrClientService;
    exports.DataService = DataService;
    exports.AuthService = AuthService;
    exports.AuthGuard = AuthGuard;
    exports.CoreService = CoreService;
    exports.CoreComponent = CoreComponent;
    exports.MyCoreModule = MyCoreModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=mycore.umd.js.map