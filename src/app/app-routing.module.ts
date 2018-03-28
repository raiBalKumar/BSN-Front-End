import { ClubsComponent } from './components/clubs/clubs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { LoginComponent } from './components/login/login.component';
import { FacebookComponent } from './components/facebook/facebook.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'auth/facebook/callback',component: FacebookComponent,},
    {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    {path: 'clubs', component: ClubsComponent, canActivate:[AuthGuard]},
    {path: 'tournaments', component: TournamentsComponent, canActivate:[AuthGuard]}
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