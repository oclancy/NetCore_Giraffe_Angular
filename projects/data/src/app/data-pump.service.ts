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

        this.openFinSrv.Hide();

        this.collection = this.db.addCollection("stockDetails");

        //this.openFinSrv
        //    .Subscribe();

        this.signalRSrv
            .Recieved
            .next(data => {

                this.collection.insertOne(data);
                this.openFinSrv.Publish( "stockDetails", this.collection.changes);

            });


    }


}
