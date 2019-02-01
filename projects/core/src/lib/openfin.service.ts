import { Injectable, Inject } from '@angular/core';
import { isDefined } from '@angular/compiler/src/util';


@Injectable()
export class OpenfinService {

    Publish(topic:string, data: any) {

        fin.desktop
            .InterApplicationBus
            .send( this.sendUuid,
                   topic,
                   data,
                     () => console.info("published ${data}, to ${topic}"));
    }

    Subscribe( topic: string, callback: (data:any, sender:string, name:string) => void ) : void {
        fin.desktop
            .InterApplicationBus
            .subscribe(this.listenUuid,
                topic,
                callback,
                () => console.info("subscribed ${sender}, to ${topic}"));
    }

    private application: fin.OpenFinApplication;

    constructor(@Inject("SendUuid") private sendUuid: string,
                @Inject("ListenUuid") private listenUuid: string,
                @Inject("favIcoPath") private favIcoPath:string ) {

        if (isDefined(fin)) {
            this.application = fin.desktop.Application.getCurrent();
        }
    }

    public Hide() {

        this.application.setTrayIcon(
            this.favIcoPath,
            function (clickInfo: any):void { },
            function (): void {
                console.info("Set tray icon to ${ this.favIcoPath }")
            },
            function (err: any):void {
                console.error(err);
            });
        //this.application.getWindow().hide();
    }
}
