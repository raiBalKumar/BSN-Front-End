import { AuthService } from './../../services/auth.service';
import { DashboardService } from './../../services/dashboard.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user$: Observable<any>;
  ref: NgbModalRef;

  constructor(private dashboardService: DashboardService,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal,
            ) { 
              console.log("clubs");
              this.dashboardService.getUserInfo();
            }

  ngOnInit() {
    this.user$ = this.dashboardService.user$; 
  }

  open(content) {
    this.ref = this.modalService.open(content);
  }

  onCreateClub(value:{}){
    this.dashboardService.createTeam(value);
    this.ref.close();
  }

  leaveClub(){
    console.log("leave club");
    this.dashboardService.leaveClub();
  }
}
