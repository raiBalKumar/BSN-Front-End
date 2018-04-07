import { Observable } from 'rxjs/Observable';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: any;
  user:any;

  constructor(private dashboardService: DashboardService,
  ) { console.log("constructor");
 }

  ngOnInit() {
    this.user = this.dashboardService.user$;
    this.dashboardService.user$.subscribe(user => {
      this.user = user;
      console.log("user from requests",this.user);

  
    console.log("requestsssssss",this.user);
    if (this.user.status === "manager") {
      console.log("i am manager");
      this.dashboardService.checkManagerRequest().subscribe(result => {
        this.requests = result;
        console.log("requests...is here", this.requests)
      })
    } else if (this.user.status === "player") {
      console.log("check player request");
      this.dashboardService.checkPlayerRequest().subscribe(result => {
        this.requests = result;
        console.log("request arrived,", this.requests)
      })
    } else if (this.user.status === "organizer") {
      this.dashboardService.checkOrganizerRequest().subscribe(result => {
        this.requests = result;
      })
    }
  })

  }
  // accept request to join the club
  acceptClub(manager_id:number, team_id:number){
    console.log(manager_id,"manager____id",team_id);
    this.dashboardService.acceptClub(manager_id, team_id);
  }
  // reject request to join the club
  rejectClub(manager_id:number){

  }



}
