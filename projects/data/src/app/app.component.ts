import { Component, OnInit } from '@angular/core';
import { DataPumpService } from './data-pump.service';
import { OpenfinService } from 'mycore';

@Component({
  selector: 'data-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
        this.openfinService
            .Hide( window.origin + "/data/assets/favicon.ico", "data-app");
    }

    title = 'data';

    constructor(private dataPumpService: DataPumpService,
                private openfinService: OpenfinService) {

        
    }
}

