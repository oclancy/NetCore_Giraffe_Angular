/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ServiceState } from './service-state';
export class SignalrClientService {
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
if (false) {
    /** @type {?} */
    SignalrClientService.prototype.promise;
    /** @type {?} */
    SignalrClientService.prototype.connection;
    /** @type {?} */
    SignalrClientService.prototype.Recieved;
    /**
     * @type {?}
     * @private
     */
    SignalrClientService.prototype.message;
    /**
     * @type {?}
     * @private
     */
    SignalrClientService.prototype.state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL215Y29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaWduYWxyLWNsaWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLL0MsTUFBTSxPQUFPLG9CQUFvQjtJQUs3QjtRQVNVLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNoQyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQWdCLENBQUM7SUFWNUMsQ0FBQzs7OztJQUVELElBQUksS0FBSztRQUVMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7OztJQU9ELElBQUksQ0FBQyxPQUFlO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7YUFDdkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUM7YUFDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0Qsd0RBQXdEO1FBRXhELHlEQUF5RDtRQUN6RCx3SUFBd0k7UUFFeEksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRTthQUMvQyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ2xCLEtBQUssRUFBRSxDQUFDO1FBR2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFdEUsQ0FBQzs7O1lBbERKLFVBQVU7Ozs7O3VCQWVOLE1BQU07Ozs7SUFaUCx1Q0FBYTs7SUFDYiwwQ0FBZ0I7O0lBV2hCLHdDQUEyRDs7Ozs7SUFFM0QsdUNBQXdDOzs7OztJQUN4QyxxQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlU3RhdGUgfSBmcm9tICcuL3NlcnZpY2Utc3RhdGUnO1xyXG5cclxuZGVjbGFyZSB2YXIgc2lnbmFsUjogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2lnbmFsckNsaWVudFNlcnZpY2Uge1xyXG5cclxuICAgIHByb21pc2U6IGFueTtcclxuICAgIGNvbm5lY3Rpb246IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFN0YXRlKCk6IE9ic2VydmFibGU8U2VydmljZVN0YXRlPlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSBSZWNpZXZlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gICAgcHJpdmF0ZSBzdGF0ZSA9IG5ldyBTdWJqZWN0PFNlcnZpY2VTdGF0ZT4oKTtcclxuXHJcbiAgICBzZW5kKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5pbnZva2UoJ0Jyb2FkY2FzdCcsIG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIudG9TdHJpbmcoKSkpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uaW52b2tlKCdCcm9hZGNhc3QnLCAxMDEpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIudG9TdHJpbmcoKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCk6dm9pZCB7XHJcbiAgICAgICAgLy9sZXQgY29ubmVjdGlvbiA9IG5ldyBzaWduYWxSLkh1YkNvbm5lY3Rpb24oJy9hcHBodWInKTtcclxuXHJcbiAgICAgICAgLy9sZXQgdXJsID0gJ2h0dHA6Ly8nICsgZG9jdW1lbnQubG9jYXRpb24uaG9zdCArICcvY2hhdCc7XHJcbiAgICAgICAgLy9sZXQgY29ubmVjdGlvbiA9IG5ldyBzaWduYWxSLkh0dHBDb25uZWN0aW9uKHVybCwgeyB0cmFuc3BvcnQ6IHNpZ25hbFIuSHR0cFRyYW5zcG9ydFR5cGUuV2ViU29ja2V0cywgbG9nZ2VyOiBzaWduYWxSLkxvZ0xldmVsLlRyYWNlIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgc2lnbmFsUi5IdWJDb25uZWN0aW9uQnVpbGRlcigpXHJcbiAgICAgICAgICAgIC53aXRoVXJsKFwiL2FwcGh1YlwiKVxyXG4gICAgICAgICAgICAuYnVpbGQoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbignU2VuZCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5SZWNpZXZlZC5lbWl0KGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb21pc2UgPSB0aGlzLmNvbm5lY3Rpb24uc3RhcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9taXNlLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9taXNlLnRoZW4oKCkgPT4gdGhpcy5zdGF0ZS5uZXh0KFNlcnZpY2VTdGF0ZS5JbnRpYWxpc2VkKSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19