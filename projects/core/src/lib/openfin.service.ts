import { Injectable, Inject, EventEmitter, Output } from '@angular/core';
import { isDefined } from '@angular/compiler/src/util';
import { SignalrClientService } from './signalr-client.service';


@Injectable()
export class OpenfinService {

    Publish(topic:string, data: any) {

        fin.desktop
            .InterApplicationBus
            .publish(topic,
                     data,
                     () => console.info(`published ${data}, to ${topic}`));
    }

    Subscribe( topic: string, callback: (data:any, sender:string, name:string) => void ) : void {

        fin.desktop
            .InterApplicationBus
            .subscribe( this.listenUuid,
                topic,
                callback,
                () => console.info(`subscribed ${this.listenUuid}, to ${topic}`));
    }

    private launchedApps: fin.OpenFinApplication[] = [] ;
    private application: fin.OpenFinApplication;

    @Output()
    public Recieved: EventEmitter<any> = new EventEmitter();

    constructor(@Inject("SendUuid") private sendUuid: string,
                @Inject("ListenUuid") private listenUuid: string,
                private signalrService: SignalrClientService) {

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

            //this.Subscribe("*",
            //        function (message, uuid, name) {
            //            console.log("The application " + uuid + " sent this message: " + message);
            //            this.Recieved.emit(message);
            //        });
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


    public Hide(iconUrl:string, windowName:string) {

        this.application
            .setTrayIcon(
                iconUrl,
                function (clickInfo: fin.TrayIconClickedEvent): void {
                    console.info(`Tray icon clicked ${clickInfo}`);

                    if (clickInfo.button == 2) {
                        //fin.desktop.System.showDeveloperTools(this.s, windowName, function () {
                        //        console.log("successful");
                        //    }, function (err) {
                        //        console.log("failure: " + err);
                        //    });

                        fin.Window
                            .getCurrent()
                            .then((win) => win.showDeveloperTools() )
                    }
                },
                function (): void {
                    console.info(`Set tray icon to ${iconUrl}`);
                    fin.desktop
                        .Window
                        .getCurrent()
                        .hide()
                },
                function (err: any):void {
                    console.error(err);
                }
            );
    }
}
