import { async } from '@angular/core/testing';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<Models.User>;
  image: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authService.user$;
    console.log("user",this.user$);
    this.image = 'assets/img/zizou.png';
    
   
  }

}
