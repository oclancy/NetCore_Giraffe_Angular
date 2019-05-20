
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignalrClientService } from 'mycore';
import { OpenfinService } from 'mycore';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule
  ],
    providers: [
        { provide: 'SendUuid', useValue: '33aa9062-9eb0-4875-b819-c90f38ef03ea' },
        { provide: 'ListenUuid', useValue: '58C8E2DA-0059-44E7-871F-9F467E9016BD' },
        { provide: 'favIcoPath', useValue: '/data/assets/favicon.ico' },
        
        SignalrClientService,
        OpenfinService
    ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
