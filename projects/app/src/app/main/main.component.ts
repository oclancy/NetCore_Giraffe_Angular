import { Component, OnInit } from '@angular/core';

import { LogoutDirective } from '../login/logout.directive';
import { DataService, OpenfinService } from 'mycore';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

    constructor(private dataSrv: DataService,
                private openfinSrv: OpenfinService) { }

    data: { name: "test" };

    private gridData: any[];
    private colDefs: any[];

    ngOnInit() {
        let that = this;

        this.colDefs = [
            { headerName: 'Symbol', field: 'symbol' },
            { headerName: 'Isin', field: 'isin' },
            { headerName: 'Price', field: 'price' }
        ];


        this.dataSrv.GetData().subscribe(data => {
            this.data = data;
        });


        this.openfinSrv
            .Subscribe("StockDetails",
                (data, sender, name) => {

                    var found = this.gridData.findIndex((row, index, all) => {
                        return row.Symbol === data.Symbol;
                    });

                    if (found === -1) {
                        this.gridData.push(data);
                    }
                    else {
                        this.gridData.splice(found, 1, data);
                    }
                });
    };

}
