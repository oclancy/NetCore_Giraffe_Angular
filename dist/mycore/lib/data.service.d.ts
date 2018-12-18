import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { EventEmitter } from '@angular/core';
export interface IDataService {
    GetData(): Observable<any>;
}
export declare class DataService implements IDataService {
    private http;
    StateChanged: EventEmitter<boolean>;
    GetData(): Observable<any>;
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError;
    constructor(http: Http);
}
