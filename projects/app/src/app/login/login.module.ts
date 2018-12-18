import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app/app-routing.module';

import { LogoutDirective } from './logout.directive';

@NgModule({
  
  imports: [
      CommonModule,
      FormsModule
    ],

  declarations: [
      LoginComponent,
      LogoutDirective,
  ],

  exports: [
      LogoutDirective
  ]
})
export class LoginModule { }
