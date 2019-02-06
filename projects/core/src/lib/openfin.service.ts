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

    private launchedApps: fin.OpenFinApplication[] = [] ;
    private application: fin.OpenFinApplication;

    constructor(@Inject("SendUuid") private sendUuid: string,
                @Inject("ListenUuid") private listenUuid: string) {

        if (isDefined(fin)) {
            this.application = fin.desktop.Application.getCurrent();

            this.application.addEventListener("window-closed", function (event) {
                console.log("The window has closed");
                for (let app of this.launchedApps) {

                    app.removeTrayIcon(function (): void {
                        console.info("Removed tray icon: ${app.Name}")
                        },
                        function (err: any): void {
                            console.error(err);
                        });

                    app.close(true,
                        function (): void {
                            console.info("App closed: ${app.Name}")
                        },
                        function (err: any): void {
                            console.error(err);
                        });
                }
            }, function () {
                console.log("The registration was successful");
            }, function (reason) {
                console.log("failure: " + reason);
                });
        }
    }

    ngOnDestroy() {
        console.log('Service destroy')
    }

    public Launch(manifestUrl: string) {

        var launchedApps = this.launchedApps;
        fin.desktop
            .Application
            .createFromManifest(manifestUrl,
                function (app): void {
                    console.info("App launching")
                    app.run(function () { console.info("App running"); }, function (err) { console.error(err); });
                    launchedApps.push(app);
                },
                function (err: any): void {
                    console.error(err);
            });
    }


    public Hide(iconUrl:string) {

        //var context: fin.OpenFinWindow = this.contextMenu;

        this.application.setTrayIcon(
            iconUrl,
            function (clickInfo: fin.TrayIconClickedEvent):void {
                //context.showAt(clickInfo.x, clickInfo.y);
            },
            function (): void {
                console.info("Set tray icon to ${ iconUrl }")
            },
            function (err: any):void {
                console.error(err);
            });
        //this.application.getWindow().hide();
    }
}
