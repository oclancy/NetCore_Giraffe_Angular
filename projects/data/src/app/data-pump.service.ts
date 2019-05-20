import { Injectable, Inject } from '@angular/core';
import { OpenfinService } from 'mycore';
import { SignalrClientService } from 'mycore';
import * as loki from 'lokijs'

@Injectable({
  providedIn: 'root'
})
export class DataPumpService {

    db: Loki = new loki('', {});
    collection: Collection<any>;

    constructor(@Inject("favIcoPath") private favIconUrl: string,
                private openFinSrv: OpenfinService,
                private signalRSrv: SignalrClientService) {

        //this.openFinSrv.Hide(window.location.origin + favIconUrl, "data-app");

        this.collection = this.db.addCollection("stockDetails",{
            indices: ['isin'],
            disableChangesApi: false
        });

        this.signalRSrv.start();
        
        this.openFinSrv.Subscribe("stockFilter", this.onStockFilter.bind(this));

        this.signalRSrv
            .Recieved
            .subscribe(data => {

                if (data.topic == "StockDetails") {
                    this.collection.clear();
                    this.collection.insert(data.data);
                    this.openFinSrv.Publish(data.topic, this.collection.changes);
                }
                else {
                    var res = this.collection.find({ "isin": data.data.isin });
                    if (res.length != 0)
                        Object.assign(res[0], data);
                    else
                        this.collection.insertOne(data);

                    this.openFinSrv.Publish(data.topic, this.collection.changes);

                    this.collection.flushChanges();
                }
            });

    }

    onStockFilter(filter: any): any {
        this.signalRSrv.stockFilter(filter);
    }
}
