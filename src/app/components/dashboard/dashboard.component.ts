import { AuthService } from './../../services/auth.service';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { UserService } from '../../services/user.service';
=======
import { Observable } from 'rxjs/Observable';
>>>>>>> e80dbf7e7c8fe42782435da5d01dd5e27d2d0929

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
<<<<<<< HEAD

  constructor(private userService: UserService) { }

  ngOnInit() {}

=======
  user: any;
  // user: any;
  constructor(private dashboardService: DashboardService,
              private authService: AuthService) { }

  ngOnInit() {
     this.user = this.authService.getUser();
    // console.log(this.user$);
    // this.dashboardService.getDashboard().subscribe(value => {
    //   this.user = value;
    //   console.log(this.user);
    // })
  }
>>>>>>> e80dbf7e7c8fe42782435da5d01dd5e27d2d0929
}
