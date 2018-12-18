import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceState } from './service-state';
export declare class SignalrClientService {
    promise: any;
    connection: any;
    constructor();
    readonly State: Observable<ServiceState>;
    Recieved: EventEmitter<any>;
    private message;
    private state;
    send(message: string): void;
    start(): void;
}
