import { Component, OnInit } from '@angular/core';

import { LogoutDirective } from '../login/logout.directive';
import { ConnectionIndicatorComponent } from './connection-indicator/connection-indicator.component';
import { DataService, OpenfinService } from 'mycore';
import { forEach } from '@angular/router/src/utils/collection';
import { GridOptions, GridApi } from 'ag-grid-community';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

    constructor(private dataSrv: DataService,
                private openfinSrv: OpenfinService) { }

    data: { name: "test" };

    private rows: any[] = [];
    private colDefs: any[];
    private gridOptions: GridOptions;
    private gridApi: GridApi;

    onGridReady(params: any) {
        this.gridApi = params.api; // To access the grids API
        this.gridApi.setRowData(this.rows); // Refresh grid
    }

    ngOnInit() {
        let that = this;

        this.gridOptions = <GridOptions>{
            rowData: this.rows,
            columnDefs: [
                { headerName: 'Symbol', field: 'symbol' },
                { headerName: 'Isin', field: 'isin' },
                { headerName: 'Price', field: 'open' }
            ]
        }


        this.dataSrv.GetData().subscribe(data => {
            this.data = data;
        });

        this.openfinSrv
            .Subscribe("StockDetail",
                (data, sender, name) => {

                    this.updateStockDetails(data); // Refresh grid

            });
        this.openfinSrv
            .Subscribe("StockDetails",
                (data, sender, name) => {

                    this.updateStockDetails(data); // Refresh grid

                });
    };

    private updateStockDetails(data: any) {
        var transaction: any = {
            add: [],
            update: [],
            remove: []
        };
        data.forEach(entry => {
            var found = this.rows.findIndex((row, index, all) => {
                return row.symbol === entry.obj.symbol;
            });
            if (found === -1 && entry.operation === "I") {
                //this.rows.push(entry.obj.data);
                transaction.add.push(entry.obj);
            }
            else if (found !== -1 && entry.operation === "U") {
                //this.rows.splice(found, 1, entry.obj.data);
                transaction.update.push(entry.obj);
            }
            else if (found !== -1 && entry.operation === "D") {
                //this.rows.splice(found, 1);
                transaction.remove.push(entry.obj);
            }
        });
        //this.gridApi.setRowData(this.rows); // Refresh grid
        this.gridApi.updateRowData(transaction);
    }

    filterStock(filter: string) {
        if (filter == "") return;

        this.openfinSrv
            .Publish("stockFilter", filter);
    };

}
