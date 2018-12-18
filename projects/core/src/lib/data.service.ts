import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http } from '@angular/http';

import { map, catchError } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

export interface IDataService {
    GetData(): Observable<any>;
}

@Injectable()
export class DataService implements IDataService{

    @Output()
    StateChanged: EventEmitter<boolean> = new EventEmitter();

    GetData(): Observable<any> {

        return this.http
                    .post('/data', {})
                    .pipe(
            map(res => res.json()),
            catchError(this.handleError('getData', []))
        )
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
  constructor(private http:Http) { }
}
