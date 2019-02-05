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
    private contextMenu: fin.OpenFinWindow;

    constructor(@Inject("SendUuid") private sendUuid: string,
                @Inject("ListenUuid") private listenUuid: string,
                @Inject("favIcoPath") private favIcoPath:string ) {

        if (isDefined(fin)) {
            this.application = fin.desktop.Application.getCurrent();

            this.contextMenu = new fin.desktop.Window(
                {
                    autoShow: true,
                    frame: false,
                    name: "data_context_menu2",
                    url: "data/assets/context-menu.html",
                    minWidth: 50,
                    minHeight: 100,
                    maxWidth: 50,
                    maxHeight: 100,
                    saveWindowState: false,


                },
                function () {
                    
                },
                function (error) {
                    console.log("Error creating window:", error);
                });
        }
    }

    public Hide() {

        var context: fin.OpenFinWindow = this.contextMenu;

        this.application.setTrayIcon(
            this.favIcoPath,
            function (clickInfo: fin.TrayIconClickedEvent):void {
                context.showAt(clickInfo.x, clickInfo.y);
            },
            function (): void {
                console.info("Set tray icon to ${ this.favIcoPath }")
            },
            function (err: any):void {
                console.error(err);
            });
        //this.application.getWindow().hide();
    }
}
