import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrClientService } from 'mycore';
import { AuthService } from 'mycore';
import { ServiceState } from 'mycore';
import { OpenfinService } from 'mycore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    isLoggedIn: boolean;

    ngOnInit(): void {
        this.openfinService.Launch("http://localhost:55819/data/assets/data.json");
    }

    title = 'app';
    time = "";

    ready: boolean;
    private topicPublish: string = "uiTopicPub";


    constructor(
        private authService: AuthService,
        private openfinService: OpenfinService,
        private router: Router) {

        this.authService.StateChanged.subscribe(s => this.IsLoggedIn = s);

    }

    get IsLoggedIn(): boolean { return this.isLoggedIn; }

    set IsLoggedIn(isloggedIn: boolean) {
        this.isLoggedIn = isloggedIn
    }

    onClickMe() {

        this.openfinService.Publish(this.topicPublish, "test");
    }
}
