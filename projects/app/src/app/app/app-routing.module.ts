import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from "../login/login.module"

import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from 'mycore';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    { path: 'main', loadChildren: '../main/main.module#MainModule', canActivate: [AuthGuard] }
    //{ path: 'main', loadChildren: '../main/main.module#MainModule'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }
