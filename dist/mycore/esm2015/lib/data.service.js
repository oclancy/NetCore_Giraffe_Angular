/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
/**
 * @record
 */
export function IDataService() { }
if (false) {
    /**
     * @return {?}
     */
    IDataService.prototype.GetData = function () { };
}
export class DataService {
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
if (false) {
    /** @type {?} */
    DataService.prototype.StateChanged;
    /**
     * @type {?}
     * @private
     */
    DataService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbXljb3JlLyIsInNvdXJjZXMiOlsibGliL2RhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFRLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFFdkMsa0NBRUM7Ozs7O0lBREcsaURBQTJCOztBQUkvQixNQUFNLE9BQU8sV0FBVzs7OztJQWtDdEIsWUFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUEvQjNCLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7SUErQjFCLENBQUM7Ozs7SUE3QmhDLE9BQU87UUFFSCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7YUFDakIsSUFBSSxDQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUN0QixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FDOUMsQ0FBQTtJQUNMLENBQUM7Ozs7Ozs7Ozs7SUFRTyxXQUFXLENBQUksU0FBUyxHQUFHLFdBQVcsRUFBRSxNQUFVO1FBQ3RELE9BQU8sQ0FBQyxLQUFVLEVBQWlCLEVBQUU7WUFFakMsd0RBQXdEO1lBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7WUFFL0MsOERBQThEO1lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLFlBQVksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFckQseURBQXlEO1lBQ3pELE9BQU8sRUFBRSxDQUFDLG1CQUFBLE1BQU0sRUFBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDO0lBQ04sQ0FBQzs7O1lBbENKLFVBQVU7Ozs7WUFYRixJQUFJOzs7MkJBY1IsTUFBTTs7OztJQUFQLG1DQUN5RDs7Ozs7SUErQi9DLDJCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcGlwZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhU2VydmljZSB7XG4gICAgR2V0RGF0YSgpOiBPYnNlcnZhYmxlPGFueT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSBpbXBsZW1lbnRzIElEYXRhU2VydmljZXtcblxyXG4gICAgQE91dHB1dCgpXG4gICAgU3RhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgR2V0RGF0YSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9kYXRhJywge30pXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLmpzb24oKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignZ2V0RGF0YScsIFtdKSlcclxuICAgICAgICApXHJcbiAgICB9XHJcblxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIEh0dHAgb3BlcmF0aW9uIHRoYXQgZmFpbGVkLlxyXG4gICAgICogTGV0IHRoZSBhcHAgY29udGludWUuXHJcbiAgICAgKiBAcGFyYW0gb3BlcmF0aW9uIC0gbmFtZSBvZiB0aGUgb3BlcmF0aW9uIHRoYXQgZmFpbGVkXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0IC0gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGFzIHRoZSBvYnNlcnZhYmxlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yPFQ+KG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQ/OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBzZW5kIHRoZSBlcnJvciB0byByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogYmV0dGVyIGpvYiBvZiB0cmFuc2Zvcm1pbmcgZXJyb3IgZm9yIHVzZXIgY29uc3VtcHRpb25cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7b3BlcmF0aW9ufSBmYWlsZWQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExldCB0aGUgYXBwIGtlZXAgcnVubmluZyBieSByZXR1cm5pbmcgYW4gZW1wdHkgcmVzdWx0LlxyXG4gICAgICAgICAgICByZXR1cm4gb2YocmVzdWx0IGFzIFQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwKSB7IH1cbn1cbiJdfQ==