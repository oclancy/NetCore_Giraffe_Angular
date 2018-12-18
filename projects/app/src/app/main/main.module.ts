import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HotComponent } from './hot/hot.component';
import { UserComponent } from './user/user.component';
import { LoginModule } from '../login/login.module';
import { DataService } from 'mycore';

@NgModule({

    imports: [
    CommonModule,
    MainRoutingModule,
    LoginModule,
    BsDropdownModule.forRoot(),
    
  ],
  declarations: [
      MainComponent,
      HotComponent,
      UserComponent,
  ],
  providers: [DataService],
})
export class MainModule { }
