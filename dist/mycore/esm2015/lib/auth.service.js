/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
export class AuthService {
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
        /** @type {?} */
        var that = this;
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
if (false) {
    /** @type {?} */
    AuthService.prototype.RedirectUrl;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.isLoggedIn;
    /** @type {?} */
    AuthService.prototype.StateChanged;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbXljb3JlLyIsInNvdXJjZXMiOlsibGliL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFHakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3pDLE1BQU0sT0FBTyxXQUFXOzs7OztJQUdwQixZQUFvQixJQUFVLEVBQVcsTUFBYztRQUFuQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVcsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWEvQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBR3BDLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUE7UUFkcEQsSUFBSSxDQUFDLElBQUk7YUFDSixHQUFHLENBQUMsT0FBTyxDQUFDO2FBQ1osSUFBSSxDQUNELEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUN4QjthQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFPRCxJQUFJLFVBQVUsS0FBYyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFFOUMsS0FBSyxDQUFDLFFBQWUsRUFBRSxRQUFlOztZQUVyQyxJQUFJLEdBQUcsSUFBSTtRQUNmLElBQUksQ0FBQyxJQUFJO2FBQ0osSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUMxRSxTQUFTLENBQUMsVUFBVSxRQUFRO1lBRXpCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEMsSUFBSSxRQUFRLENBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDaEQsQ0FBQyxFQUNELFVBQVMsS0FBSztZQUNWLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVYLENBQUM7Ozs7SUFHTSxNQUFNOztZQUVMLElBQUksR0FBRyxJQUFJO1FBQ2YsSUFBSSxDQUFDLElBQUk7YUFDSixHQUFHLENBQUMsU0FBUyxDQUFDO2FBQ2QsSUFBSSxDQUNELEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUVWLENBQUM7OztZQXJESixVQUFVOzs7O1lBUkYsSUFBSTtZQU1KLE1BQU07OzsyQkFxQlYsTUFBTTs7OztJQWpCUCxrQ0FBb0I7Ozs7O0lBZXBCLGlDQUFvQzs7SUFFcEMsbUNBQ3dEOzs7OztJQWhCNUMsMkJBQWtCOzs7OztJQUFFLDZCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBwaXBlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbiAgICAgICAgXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICAgIFJlZGlyZWN0VXJsOiBzdHJpbmc7XHJcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSAgcm91dGVyOiBSb3V0ZXIpIHtcblxuICAgICAgICB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQoXCIvYXV0aFwiKVxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAocmVzID0+cmVzLmpzb24oKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvZ2dlZEluID0gZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXRlQ2hhbmdlZC5lbWl0KHRoaXMuaXNMb2dnZWRJbik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTG9nZ2VkSW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKVxuICAgIFN0YXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgICBnZXQgSXNMb2dnZWRJbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbjsgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbih1c2VybmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZykge1xuXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5odHRwXG4gICAgICAgICAgICAucG9zdChcIi9sb2dpblwiLCBKU09OLnN0cmluZ2lmeSh7IFVzZXJuYW1lOiB1c2VybmFtZSwgUGFzc3dvcmQ6IHBhc3N3b3JkIH0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoYXQuaXNMb2dnZWRJbiA9IHJlc3BvbnNlLm9rO1xuICAgICAgICAgICAgICAgIHRoYXQuU3RhdGVDaGFuZ2VkLmVtaXQodGhhdC5pc0xvZ2dlZEluKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHRoYXQucm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pXHJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIHRoYXQuaXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoYXQuU3RhdGVDaGFuZ2VkLmVtaXQodGhhdC5pc0xvZ2dlZEluKTtcclxuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIHB1YmxpYyBsb2dvdXQoKSB7XG5cbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQoXCIvbG9nb3V0XCIpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocmVzID0+IHsgaWYgKHJlcy5vaykgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL1wiXSkgfSksXG4gICAgICAgICAgICApO1xuXG4gICAgfVxufVxuIl19