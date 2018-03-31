import { AuthService } from './../../services/auth.service';
import { DashboardService } from './../../services/dashboard.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Observable<Models.User>;
  ref: NgbModalRef;

  constructor(private dashboardService: DashboardService,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal,
            ) { 
              console.log("clubs");

            }

  ngOnInit() {
    this.dashboardService.getUserInfo();

    this.dashboardService.user$.subscribe(user => {
      this.user = user;
      console.log("user...",this.user);

    });
    // console.log(this.user$);
    // this.dashboardService.getDashboard().subscribe(value => {
    //   this.user = value;
    //   console.log(this.user);
    // })
  }
  open(content) {
    this.ref = this.modalService.open(content);
    this.ref.result.then((result) => {
       
    }, (reason) => {
      
    });
  }
  onCreateClub(value:{}){
   console.log("club name: ",value);
    this.dashboardService.createTeam(value);
    this.ref.close();
  }
}
