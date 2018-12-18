import { Subject, of } from 'rxjs';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable, Output, EventEmitter, Component, NgModule, defineInjectable, inject } from '@angular/core';

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
        this.Recieved = new EventEmitter();
        this.message = new Subject();
        this.state = new Subject();
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
        { type: Injectable }
    ];
    /** @nocollapse */
    SignalrClientService.ctorParameters = function () { return []; };
    SignalrClientService.propDecorators = {
        Recieved: [{ type: Output }]
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
        this.StateChanged = new EventEmitter();
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
            .pipe(map(function (res) { return res.json(); }), catchError(this.handleError('getData', [])));
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
            return of((/** @type {?} */ (result)));
        };
    };
    DataService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DataService.ctorParameters = function () { return [
        { type: Http }
    ]; };
    DataService.propDecorators = {
        StateChanged: [{ type: Output }]
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
        this.StateChanged = new EventEmitter();
        this.http
            .get("/auth")
            .pipe(map(function (res) { return res.json(); }))
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
            .pipe(map(function (res) { if (res.ok)
            _this.router.navigate(["/"]); }));
    };
    AuthService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: Http },
        { type: Router }
    ]; };
    AuthService.propDecorators = {
        StateChanged: [{ type: Output }]
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: AuthService },
        { type: Router }
    ]; };
    /** @nocollapse */ AuthGuard.ngInjectableDef = defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(inject(AuthService), inject(Router)); }, token: AuthGuard, providedIn: "root" });
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CoreService.ctorParameters = function () { return []; };
    /** @nocollapse */ CoreService.ngInjectableDef = defineInjectable({ factory: function CoreService_Factory() { return new CoreService(); }, token: CoreService, providedIn: "root" });
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
        { type: Component, args: [{
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
        { type: NgModule, args: [{
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

export { ServiceState, SignalrClientService, DataService, AuthService, AuthGuard, CoreService, CoreComponent, MyCoreModule };

//# sourceMappingURL=mycore.js.map