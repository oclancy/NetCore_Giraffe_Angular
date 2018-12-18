import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
        
@Injectable()
export class AuthService {
    RedirectUrl: string;

    constructor(private http: Http, private  router: Router) {

        this.http
            .get("/auth")
            .pipe(
                map(res =>res.json())
            )
            .subscribe(data => {
                this.isLoggedIn = data;
                this.StateChanged.emit(this.isLoggedIn);
            });
    }

    private isLoggedIn: boolean = false;

    @Output()
    StateChanged: EventEmitter<boolean> = new EventEmitter()

    get IsLoggedIn(): boolean { return this.isLoggedIn; }

    public login(username:string, password:string) {

        var that = this;
        this.http
            .post("/login", JSON.stringify({ Username: username, Password: password }))
            .subscribe(function (response) {
               
                that.isLoggedIn = response.ok;
                that.StateChanged.emit(that.isLoggedIn);

                if (response.ok) that.router.navigate(["/"])
            },
            function(error) {
                that.isLoggedIn = false;
                that.StateChanged.emit(that.isLoggedIn);
            });

    }


    public logout() {

        var that = this;
        this.http
            .get("/logout")
            .pipe(
                map(res => { if (res.ok) this.router.navigate(["/"]) }),
            );

    }
}
