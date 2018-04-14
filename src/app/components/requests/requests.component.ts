import { ChatService } from './../../services/chat.service';
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
  requests$: Observable<any>;
  user: any;
  userStatus: any;

  constructor(private dashboardService: DashboardService,
              private chat: ChatService,
              private authService: AuthService
  ) {
    console.log("constructor");
    this.userStatus = this.authService.status;

  }
          
  ngOnInit() {
    this.chat.messages.subscribe((res) => {
      if(res['type'] === 'event'){
        this.refresh();
      }
     });

    this.dashboardService.user$.subscribe(user => {
      this.user = user;
      console.log("check request");

      if (this.user.status) {
        if (this.user.status === "manager") {
          this.requests$ = this.dashboardService.checkManagerRequest();

        } else if (this.user.status === "player") {
          this.requests$ = this.dashboardService.checkPlayerRequest();
        } // else if (this.user.status === "organizer") {
        //   this.requests$ = this.dashboardService.checkOrganizerRequest();
        // }
      }
    })

    if (this.userStatus.status === "organizer") {
      this.requests$ = this.dashboardService.checkOrganizerRequest();
    }
  }
  
  // accept request to join the club
  acceptClub(manager_id: number, team_id: number) {
    console.log('accept club');
    this.dashboardService.acceptClub(manager_id, team_id)
      .subscribe((res) => {
        console.log("update userinfo");
        this.dashboardService.getUserInfo();
        this.chat.sendEvent('Club');
        this.chat.messages.subscribe((res) => {
          if(res['type'] === 'event'){
            this.refresh();
          }   
        })
      })
  }
  // reject request to join the club
  rejectClub(manager_id: number) {
    this.dashboardService.rejectClub(manager_id)
      .subscribe((res) => {
        this.dashboardService.getUserInfo();
        this.chat.sendEvent('Club');
        this.chat.messages.subscribe((res) => {
          if(res['type'] === 'event'){
            console.log("res on request comp", res)
            this.refresh();
          }      
         })
      })
  }

  refresh(){
    this.dashboardService.getUserInfo();
  }



}
