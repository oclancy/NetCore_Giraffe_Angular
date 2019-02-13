import { Injectable } from '@angular/core';
import { OpenfinService } from 'mycore';
import { SignalrClientService } from 'mycore';
import * as loki from 'lokijs'

@Injectable({
  providedIn: 'root'
})
export class DataPumpService {

    db: Loki = new loki('', {});
    collection: Collection<any>;

    constructor(private openFinSrv: OpenfinService,
                private signalRSrv: SignalrClientService) {

        this.openFinSrv.Hide("http://localhost:55819/data/assets/favicon.ico");

        this.collection = this.db.addCollection("stockDetails",{
            indices: ['isin'],
            disableChangesApi: false
        });

        this.signalRSrv.start();

        this.signalRSrv
            .Recieved
            .next(data => {

                var res = this.collection.find({ "isin": data.isin });
                if (res.length != 0)
                    Object.assign(res[0], data);
                else
                    this.collection.insertOne(data);

                this.openFinSrv.Publish( data.topic, this.collection.changes);

            });
    }


}
