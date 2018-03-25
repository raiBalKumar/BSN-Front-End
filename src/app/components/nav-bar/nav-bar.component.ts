import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logOut();
    this.flashMessage.show("You're logged out", { cssClass: "alert-success", timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}
