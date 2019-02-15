import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'mycore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username:string = "user";
    password:string = "password";

    constructor(private authSrv: AuthService) {

    }

    ngOnInit() {
    }

    onSubmit() {
        this.authSrv.login( this.username, this.password );
    }

    onAuthOpenId() {
        this.authSrv.auth0login( this.username );
    }
}
