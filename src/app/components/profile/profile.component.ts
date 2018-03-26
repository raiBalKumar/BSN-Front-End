import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Models.User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    if(!this.user.image){
      this.user.image = 'assets/img/zizou.png';
    }
  }

}
