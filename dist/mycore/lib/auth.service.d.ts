import { Http } from '@angular/http';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
export declare class AuthService {
    private http;
    private router;
    RedirectUrl: string;
    constructor(http: Http, router: Router);
    private isLoggedIn;
    StateChanged: EventEmitter<boolean>;
    readonly IsLoggedIn: boolean;
    login(username: string, password: string): void;
    logout(): void;
}
