import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';

import { FacebookAuthService } from './services/facebook-auth.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    FacebookAuthService,
    AuthService,
    OAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
