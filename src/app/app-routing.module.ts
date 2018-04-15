import { ClubsComponent } from './components/clubs/clubs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { LoginComponent } from './components/login/login.component';
import { FacebookComponent } from './components/facebook/facebook.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateTournamentComponent } from './components/tournaments/create-tournament/create-tournament.component';
import { EditTournamentComponent } from './components/tournaments/edit-tournament/edit-tournament.component';
import { UpdateScoreComponent } from './components/tournaments/update-score/update-score.component';
import { RankingComponent } from './components/tournaments/ranking/ranking.component';
import { ListFixtureComponent } from './components/tournaments/list-fixture/list-fixture.component';
import { AddFixtureComponent } from './components/tournaments/add-fixture/add-fixture.component';
import { LandingComponent } from './components/landing/landing.component';
import { EditFixtureComponent } from './components/tournaments/edit-fixture/edit-fixture.component';


const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'auth/facebook/callback',component: FacebookComponent,},
    {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    {path: 'clubs', component: ClubsComponent, canActivate:[AuthGuard]},
    {path: 'tournaments', component: TournamentsComponent, canActivate:[AuthGuard]},
    // need to set authentication to restrict only organizer can create tournament
    {path: 'tournament/create', component: CreateTournamentComponent, canActivate: [AuthGuard]},
    {path: 'tournament/edit/:id', component: EditTournamentComponent, canActivate: [AuthGuard]},
    {path: 'tournament/score/:id', component: UpdateScoreComponent, canActivate: [AuthGuard]},
    {path: 'tournament/ranking/:id', component: RankingComponent, canActivate: [AuthGuard]},
    {path: 'tournament/:id/fixture', component: ListFixtureComponent, canActivate: [AuthGuard]},
    {path: 'tournament/:id/addfixture', component: AddFixtureComponent, canActivate: [AuthGuard]},
    {path: 'tournament/:tournamentId/fixture/:fixtureId/edit', component: EditFixtureComponent, canActivate: [AuthGuard]}
    // end
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