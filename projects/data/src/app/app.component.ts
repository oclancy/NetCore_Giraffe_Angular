import { Component } from '@angular/core';
import { DataPumpService } from './data-pump.service';

@Component({
  selector: 'data-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'data';

    constructor(private dataPumpService: DataPumpService) {

        
    }
}

