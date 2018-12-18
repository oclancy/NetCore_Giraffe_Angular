import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { HotComponent } from './hot/hot.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'user', component: UserComponent},
            { path: 'hot', component: HotComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
