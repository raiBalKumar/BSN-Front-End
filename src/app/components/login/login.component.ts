import { Component, OnInit } from '@angular/core';
import { FacebookAuthService } from '../../services/facebook-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private facebookAuthService: FacebookAuthService) { }

  ngOnInit() {
  }

  onFacebookLogin() {
    this.facebookAuthService.logIn();
  }

}
