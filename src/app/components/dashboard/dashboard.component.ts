import { AuthService } from './../../services/auth.service';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  status: any;

  constructor(private dashboardService: DashboardService,
    private authService: AuthService) { }

  ngOnInit() {
    this.status = this.authService.getStatus();
    // console.log(this.user$);
    // this.dashboardService.getDashboard().subscribe(value => {
    //   this.user = value;
    //   console.log(this.user);
    // })
  }
}
