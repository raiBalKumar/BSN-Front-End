import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { FacebookComponent } from './components/facebook/facebook.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
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
    LoginComponent,
    FacebookComponent
]