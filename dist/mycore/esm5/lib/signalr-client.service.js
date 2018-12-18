/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ServiceState } from './service-state';
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
export { SignalrClientService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL215Y29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaWduYWxyLWNsaWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJL0M7SUFNSTtRQVNVLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNoQyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQWdCLENBQUM7SUFWNUMsQ0FBQztJQUVELHNCQUFJLHVDQUFLOzs7O1FBQVQ7WUFFSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7Ozs7O0lBT0QsbUNBQUk7Ozs7SUFBSixVQUFLLE9BQWU7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQzthQUN2QyxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQzthQUNuQyxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELG9DQUFLOzs7SUFBTDtRQUNJLHdEQUF3RDtRQUQ1RCxpQkFzQkM7UUFuQkcseURBQXlEO1FBQ3pELHdJQUF3STtRQUV4SSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLG9CQUFvQixFQUFFO2FBQy9DLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDbEIsS0FBSyxFQUFFLENBQUM7UUFHYixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQSxJQUFJO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO0lBRXRFLENBQUM7O2dCQWxESixVQUFVOzs7OzsyQkFlTixNQUFNOztJQW9DWCwyQkFBQztDQUFBLEFBbkRELElBbURDO1NBbERZLG9CQUFvQjs7O0lBRTdCLHVDQUFhOztJQUNiLDBDQUFnQjs7SUFXaEIsd0NBQTJEOzs7OztJQUUzRCx1Q0FBd0M7Ozs7O0lBQ3hDLHFDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlcnZpY2VTdGF0ZSB9IGZyb20gJy4vc2VydmljZS1zdGF0ZSc7XHJcblxyXG5kZWNsYXJlIHZhciBzaWduYWxSOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxyQ2xpZW50U2VydmljZSB7XHJcblxyXG4gICAgcHJvbWlzZTogYW55O1xyXG4gICAgY29ubmVjdGlvbjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgU3RhdGUoKTogT2JzZXJ2YWJsZTxTZXJ2aWNlU3RhdGU+XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIFJlY2lldmVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2UgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcbiAgICBwcml2YXRlIHN0YXRlID0gbmV3IFN1YmplY3Q8U2VydmljZVN0YXRlPigpO1xyXG5cclxuICAgIHNlbmQobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmludm9rZSgnQnJvYWRjYXN0JywgbWVzc2FnZSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVyci50b1N0cmluZygpKSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5pbnZva2UoJ0Jyb2FkY2FzdCcsIDEwMSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVyci50b1N0cmluZygpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKTp2b2lkIHtcclxuICAgICAgICAvL2xldCBjb25uZWN0aW9uID0gbmV3IHNpZ25hbFIuSHViQ29ubmVjdGlvbignL2FwcGh1YicpO1xyXG5cclxuICAgICAgICAvL2xldCB1cmwgPSAnaHR0cDovLycgKyBkb2N1bWVudC5sb2NhdGlvbi5ob3N0ICsgJy9jaGF0JztcclxuICAgICAgICAvL2xldCBjb25uZWN0aW9uID0gbmV3IHNpZ25hbFIuSHR0cENvbm5lY3Rpb24odXJsLCB7IHRyYW5zcG9ydDogc2lnbmFsUi5IdHRwVHJhbnNwb3J0VHlwZS5XZWJTb2NrZXRzLCBsb2dnZXI6IHNpZ25hbFIuTG9nTGV2ZWwuVHJhY2UgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG5ldyBzaWduYWxSLkh1YkNvbm5lY3Rpb25CdWlsZGVyKClcclxuICAgICAgICAgICAgLndpdGhVcmwoXCIvYXBwaHViXCIpXHJcbiAgICAgICAgICAgIC5idWlsZCgpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uKCdTZW5kJywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLlJlY2lldmVkLmVtaXQoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IHRoaXMuY29ubmVjdGlvbi5zdGFydCgpO1xyXG5cclxuICAgICAgICB0aGlzLnByb21pc2UuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG5cclxuICAgICAgICB0aGlzLnByb21pc2UudGhlbigoKSA9PiB0aGlzLnN0YXRlLm5leHQoU2VydmljZVN0YXRlLkludGlhbGlzZWQpKTtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=