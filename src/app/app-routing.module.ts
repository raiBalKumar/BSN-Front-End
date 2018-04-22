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
import { FixturesAndRankingComponent } from './components/tournaments/fixtures-and-ranking/fixtures-and-ranking.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { AboutComponent } from './components/about/about.component';
import { RoleGuard } from './services/role-guard.service';



const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'auth/facebook/callback',component: FacebookComponent,},
    {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard, RoleGuard]},
    {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard, RoleGuard]},
    {path: 'clubs', component: ClubsComponent, canActivate:[AuthGuard, RoleGuard]},
    {path: 'tournaments/all', component: TournamentsComponent, canActivate:[AuthGuard, RoleGuard]},
    // need to set authentication to restrict only organizer can create tournament
    {path: 'tournaments/create', component: CreateTournamentComponent, canActivate: [AuthGuard, RoleGuard]},
    {path: 'tournament/edit/:id', component: EditTournamentComponent, canActivate: [AuthGuard, RoleGuard]},
    {path: 'tournament/score/:id', component: UpdateScoreComponent, canActivate: [AuthGuard, RoleGuard]},
    {path: 'tournament/fixtures-ranking/:id', component: FixturesAndRankingComponent, canActivate: [AuthGuard, RoleGuard]},
    {path: 'tournament/:id/fixture', component: ListFixtureComponent, canActivate: [AuthGuard, RoleGuard]},
    {path: 'tournament/:id/addfixture', component: AddFixtureComponent, canActivate: [AuthGuard, RoleGuard]},
    {path: 'tournament/:tournamentId/fixture/:fixtureId/edit', component: EditFixtureComponent, canActivate: [AuthGuard, RoleGuard]},
    // end
    {path: 'role', component: UserInformationComponent, canActivate: [AuthGuard]},
    {path: '**', component: LandingComponent}
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