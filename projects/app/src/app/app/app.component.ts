import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrClientService } from 'mycore';
import { AuthService } from 'mycore';
import { ServiceState } from 'mycore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    isLoggedIn: boolean;

    ngOnInit(): void {
        this.signalrService.start();
        this.signalrService.Recieved.subscribe(data =>
            this.time = data);
    }

    title = 'app';
    time = "";

    ready: boolean;

    constructor(private signalrService: SignalrClientService,
        private authService: AuthService,
        private router: Router) {

        this.authService.StateChanged.subscribe(s => this.IsLoggedIn = s);

        this.signalrService.State.subscribe(s => this.ready = s == ServiceState.Intialised ?  true : false);
    }

    get IsLoggedIn(): boolean { return this.isLoggedIn; }

    set IsLoggedIn(isloggedIn: boolean) { this.isLoggedIn = isloggedIn }

    onClickMe() {

        this.signalrService.send("test");
    }
}
