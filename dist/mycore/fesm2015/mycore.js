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
const ServiceState = {
    Unititialised: 0,
    Intialised: 1,
};
ServiceState[ServiceState.Unititialised] = 'Unititialised';
ServiceState[ServiceState.Intialised] = 'Intialised';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SignalrClientService {
    constructor() {
        this.Recieved = new EventEmitter();
        this.message = new Subject();
        this.state = new Subject();
    }
    /**
     * @return {?}
     */
    get State() {
        return this.state.asObservable();
    }
    /**
     * @param {?} message
     * @return {?}
     */
    send(message) {
        this.connection.invoke('Broadcast', message)
            .catch(err => console.error(err.toString()));
        this.connection.invoke('Broadcast', 101)
            .catch(err => console.error(err.toString()));
    }
    /**
     * @return {?}
     */
    start() {
        //let connection = new signalR.HubConnection('/apphub');
        //let url = 'http://' + document.location.host + '/chat';
        //let connection = new signalR.HttpConnection(url, { transport: signalR.HttpTransportType.WebSockets, logger: signalR.LogLevel.Trace });
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/apphub")
            .build();
        this.connection.on('Send', data => {
            console.log(data);
            this.Recieved.emit(data);
        });
        this.promise = this.connection.start();
        this.promise.catch(err => console.log(err));
        this.promise.then(() => this.state.next(ServiceState.Intialised));
    }
}
SignalrClientService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SignalrClientService.ctorParameters = () => [];
SignalrClientService.propDecorators = {
    Recieved: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.StateChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    GetData() {
        return this.http
            .post('/data', {})
            .pipe(map(res => res.json()), catchError(this.handleError('getData', [])));
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @private
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    handleError(operation = 'operation', result) {
        return (error) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of((/** @type {?} */ (result)));
        };
    }
}
DataService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DataService.ctorParameters = () => [
    { type: Http }
];
DataService.propDecorators = {
    StateChanged: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthService {
    /**
     * @param {?} http
     * @param {?} router
     */
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.isLoggedIn = false;
        this.StateChanged = new EventEmitter();
        this.http
            .get("/auth")
            .pipe(map(res => res.json()))
            .subscribe(data => {
            this.isLoggedIn = data;
            this.StateChanged.emit(this.isLoggedIn);
        });
    }
    /**
     * @return {?}
     */
    get IsLoggedIn() { return this.isLoggedIn; }
    /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    login(username, password) {
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
    }
    /**
     * @return {?}
     */
    logout() {
        this.http
            .get("/logout")
            .pipe(map(res => { if (res.ok)
            this.router.navigate(["/"]); }));
    }
}
AuthService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: Http },
    { type: Router }
];
AuthService.propDecorators = {
    StateChanged: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthGuard {
    /**
     * @param {?} authService
     * @param {?} router
     */
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        /** @type {?} */
        let url = state.url;
        return this.checkLogin(url);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    checkLogin(url) {
        if (this.authService.IsLoggedIn) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.RedirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }
}
AuthGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AuthGuard.ctorParameters = () => [
    { type: AuthService },
    { type: Router }
];
/** @nocollapse */ AuthGuard.ngInjectableDef = defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(inject(AuthService), inject(Router)); }, token: AuthGuard, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CoreService {
    constructor() { }
}
CoreService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CoreService.ctorParameters = () => [];
/** @nocollapse */ CoreService.ngInjectableDef = defineInjectable({ factory: function CoreService_Factory() { return new CoreService(); }, token: CoreService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CoreComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
CoreComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-Core',
                template: `
    <p>
      core works!
    </p>
  `
            }] }
];
/** @nocollapse */
CoreComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MyCoreModule {
}
MyCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [CoreComponent],
                exports: [CoreComponent]
            },] }
];

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