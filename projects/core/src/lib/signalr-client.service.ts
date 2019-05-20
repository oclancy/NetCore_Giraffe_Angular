
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ServiceState } from './service-state';
import { forEach } from '@angular/router/src/utils/collection';

declare var signalR: any;

@Injectable()
export class SignalrClientService {

    promise: any;
    connection: any;

    constructor() {

    }

    get State(): Observable<ServiceState>
    {
        return this.state.asObservable();
    }

    @Output() Recieved: EventEmitter<any> = new EventEmitter();

    private message = new Subject<string>();
    private state = new Subject<ServiceState>();

    public send(method:string, message: string): void {
        this.connection.invoke('Broadcast', message)
            .catch(err => console.error(err.toString()));

        this.connection.invoke('Broadcast', 101)
            .catch(err => console.error(err.toString()));
    }

    public stockFilter(filter: string): void {
        this.connection.invoke('StockFilter', filter)
            .catch(err => console.error(err.toString()));
    }

    public getRoles(): void {
        this.connection.invoke('Roles')
            .catch(err => console.error(err.toString()));
    }

    public start():void {

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/apphub")
            .build();

        this.connection.on('Send', data => {
            console.log(data);
            this.Recieved.emit({
                topic: "Send",
                data: data
            });
        });

        this.connection.on('StockDetail', data => {
            console.log("StockDetail recieved: ${[data]}");
            this.Recieved.emit({
                topic: "StockDetail",
                data: data
            });
        });

        this.connection.on('StockDetails', data => {
            console.log("StockDetails recieved: ${[data]}");

            data.forEach( sd => {
                this.Recieved.emit({
                    topic: "StockDetail",
                    data: data
                });
            });
        });

        this.connection.on('Roles', roles => {
            console.log("Roles recieved: ${[data]}");
            this.Recieved.emit(roles);
        });


        this.promise = this.connection.start();

        this.promise.catch(err => console.log(err));

        this.promise.then(() => this.state.next(ServiceState.Intialised));

    }
}
