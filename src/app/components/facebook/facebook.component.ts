import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { parse } from 'query-string';


@Component({
  // selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  constructor(private authService: AuthService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      console.log('profile')
      this.router.navigate(['/profile']);
    } else {
      this.route.fragment.subscribe((fragment:string)=>{
        this.authService.facebookLogin(parse(fragment).access_token);
      });
    }
  }
}
