
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ServiceState } from './service-state';

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

    public send(message: string): void {
        this.connection.invoke('Broadcast', message)
            .catch(err => console.error(err.toString()));

        this.connection.invoke('Broadcast', 101)
            .catch(err => console.error(err.toString()));
    }

    public start():void {
        //let connection = new signalR.HubConnection('/apphub');

        //let url = 'http://' + document.location.host + '/chat';
        //let connection = new signalR.HttpConnection(url, { transport: signalR.HttpTransportType.WebSockets, logger: signalR.LogLevel.Trace });

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

        this.promise = this.connection.start();

        this.promise.catch(err => console.log(err));

        this.promise.then(() => this.state.next(ServiceState.Intialised));

    }
}
