import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { FacebookComponent } from './components/facebook/facebook.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'facebook', component: FacebookComponent},
    {path:'auth/facebook/callback',component: FacebookComponent}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}
export const routingComponents = [
    NavBarComponent,
    LoginComponent,
    FacebookComponent
]