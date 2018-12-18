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
        /** @type {?} */
        var that = this;
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
export { AuthService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbXljb3JlLyIsInNvdXJjZXMiOlsibGliL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFHakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDO0lBSUkscUJBQW9CLElBQVUsRUFBVyxNQUFjO1FBQXZELGlCQVdDO1FBWG1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBYS9DLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFHcEMsaUJBQVksR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQWRwRCxJQUFJLENBQUMsSUFBSTthQUNKLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDWixJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFHLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUN4QjthQUNBLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDWCxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBT0Qsc0JBQUksbUNBQVU7Ozs7UUFBZCxjQUE0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7Ozs7O0lBRTlDLDJCQUFLOzs7OztJQUFaLFVBQWEsUUFBZSxFQUFFLFFBQWU7O1lBRXJDLElBQUksR0FBRyxJQUFJO1FBQ2YsSUFBSSxDQUFDLElBQUk7YUFDSixJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQzFFLFNBQVMsQ0FBQyxVQUFVLFFBQVE7WUFFekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4QyxJQUFJLFFBQVEsQ0FBQyxFQUFFO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNoRCxDQUFDLEVBQ0QsVUFBUyxLQUFLO1lBQ1YsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQzs7OztJQUdNLDRCQUFNOzs7SUFBYjtRQUFBLGlCQVNDOztZQVBPLElBQUksR0FBRyxJQUFJO1FBQ2YsSUFBSSxDQUFDLElBQUk7YUFDSixHQUFHLENBQUMsU0FBUyxDQUFDO2FBQ2QsSUFBSSxDQUNELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBTSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQzFELENBQUM7SUFFVixDQUFDOztnQkFyREosVUFBVTs7OztnQkFSRixJQUFJO2dCQU1KLE1BQU07OzsrQkFxQlYsTUFBTTs7SUFtQ1gsa0JBQUM7Q0FBQSxBQXRERCxJQXNEQztTQXJEWSxXQUFXOzs7SUFDcEIsa0NBQW9COzs7OztJQWVwQixpQ0FBb0M7O0lBRXBDLG1DQUN3RDs7Ozs7SUFoQjVDLDJCQUFrQjs7Ozs7SUFBRSw2QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcGlwZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG4gICAgICAgIFxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcbiAgICBSZWRpcmVjdFVybDogc3RyaW5nO1xyXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgIHJvdXRlcjogUm91dGVyKSB7XG5cbiAgICAgICAgdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0KFwiL2F1dGhcIilcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PnJlcy5qc29uKCkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2dnZWRJbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5TdGF0ZUNoYW5nZWQuZW1pdCh0aGlzLmlzTG9nZ2VkSW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0xvZ2dlZEluOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KClcbiAgICBTdGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gICAgZ2V0IElzTG9nZ2VkSW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmlzTG9nZ2VkSW47IH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW4odXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpIHtcblxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuaHR0cFxuICAgICAgICAgICAgLnBvc3QoXCIvbG9naW5cIiwgSlNPTi5zdHJpbmdpZnkoeyBVc2VybmFtZTogdXNlcm5hbWUsIFBhc3N3b3JkOiBwYXNzd29yZCB9KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGF0LmlzTG9nZ2VkSW4gPSByZXNwb25zZS5vaztcbiAgICAgICAgICAgICAgICB0aGF0LlN0YXRlQ2hhbmdlZC5lbWl0KHRoYXQuaXNMb2dnZWRJbik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB0aGF0LnJvdXRlci5uYXZpZ2F0ZShbXCIvXCJdKVxyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmlzTG9nZ2VkSW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGF0LlN0YXRlQ2hhbmdlZC5lbWl0KHRoYXQuaXNMb2dnZWRJbik7XHJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgbG9nb3V0KCkge1xuXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0KFwiL2xvZ291dFwiKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiB7IGlmIChyZXMub2spIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pIH0pLFxuICAgICAgICAgICAgKTtcblxuICAgIH1cbn1cbiJdfQ==