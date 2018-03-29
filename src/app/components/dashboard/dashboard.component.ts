import { AuthService } from './../../services/auth.service';
import { DashboardService } from './../../services/dashboard.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Observable<any>;
  ref: NgbModalRef;
  constructor(private dashboardService: DashboardService,
              private authService: AuthService,
              private modalService: NgbModal,
            ) { }

  ngOnInit() {
     this.user = this.authService.getUser();
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
  onSubmitRegister(value:{}){
   
    this.ref.close();
  }
}
