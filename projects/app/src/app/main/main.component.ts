import { Component, OnInit } from '@angular/core';

import { LogoutDirective } from '../login/logout.directive';
import { DataService, OpenfinService } from 'mycore';
import { forEach } from '@angular/router/src/utils/collection';



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

        this.gridData = [];

        this.colDefs = [
            { headerName: 'Symbol', field: 'symbol' },
            { headerName: 'Isin', field: 'isin' },
            { headerName: 'Price', field: 'price' }
        ];


        this.dataSrv.GetData().subscribe(data => {
            this.data = data;
        });


        this.openfinSrv
            .Subscribe("StockDetail",
                (data, sender, name) => {

                    data.forEach(entry => {
                        var found = this.gridData.findIndex((row, index, all) => {
                            return row.symbol === entry.obj.data.symbol;
                        });

                        if (found === -1 && entry.operation === "I") {
                            this.gridData.push(entry.obj.data);
                        }
                        else if (found !== -1 && entry.operation === "U") {
                            this.gridData.splice(found, 1, entry.obj.data);
                        }
                        else if (found !== -1 && entry.operation === "D") {
                            this.gridData.splice(found, 1);
                        }
                    });
                });
    };

}
