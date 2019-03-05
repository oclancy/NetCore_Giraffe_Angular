import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginModule } from '../login/login.module';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from 'mycore';
import { SignalrClientService } from 'mycore';
import { OpenfinService } from 'mycore';
import { CoreModule } from 'mycore';

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      CoreModule,
      AppRoutingModule,
      LoginModule
  ],
    providers: [
        AuthService,
        SignalrClientService,
        OpenfinService,
        { provide: 'SendUuid', useValue: 'client-app' },
        { provide: 'ListenUuid', useValue: '33aa9062-9eb0-4875-b819-c90f38ef03ea' }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
