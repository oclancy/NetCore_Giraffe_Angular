import { Component, OnInit } from '@angular/core';

import { LogoutDirective } from '../login/logout.directive';
import { DataService } from 'mycore';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

    constructor(private dataSrv:DataService ) { }

    data: {name:"test"};

    ngOnInit() {
        let that = this;

        this.dataSrv.GetData().subscribe(data => {
            this.data = data;
        });
  }

}
