import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { FacebookAuthService } from './services/facebook-auth.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';
import { ProfileComponent } from './components/profile/profile.component';
import { ClubsComponent } from './components/clubs/clubs.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { UserService } from './services/user.service';
import { DashboardService } from './services/dashboard.service';
import { RequestsComponent } from './components/requests/requests.component';
import { PlayerMarketComponent } from './components/player-market/player-market.component';
import { TeamService } from './services/team.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SquadComponent } from './components/squad/squad.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavBarComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    ClubsComponent,
    TournamentsComponent,
    RequestsComponent,
    PlayerMarketComponent,
    CalendarComponent,
    SquadComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  providers: [
    FacebookAuthService,
    AuthService,
    OAuthService,
    FlashMessagesService,
    AuthGuard,
    UserService,
    DashboardService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
