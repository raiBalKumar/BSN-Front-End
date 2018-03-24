import { Component, OnInit } from '@angular/core';
import { FacebookAuthService } from '../../services/facebook-auth.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private facebookAuthService: FacebookAuthService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onFacebookLogin() {
    this.facebookAuthService.logIn();
  }

  onFacebookLogOut() {
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }

}
