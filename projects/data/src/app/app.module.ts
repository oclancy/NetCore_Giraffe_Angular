
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
        { provide: 'SendUuid', useValue: 'data-app' },
        { provide: 'ListenUuid', useValue: 'client-app' },
        { provide: 'favIcoPath', useValue: 'data/assets/favicon.ico' },
        
        SignalrClientService,
        OpenfinService
    ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
