import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
 user:any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.user$.subscribe(user=>{
      this.user = user;
    })
  }

}
