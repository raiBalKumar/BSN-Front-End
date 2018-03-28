import { AuthService } from './../../services/auth.service';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
}
