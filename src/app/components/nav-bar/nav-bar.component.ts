import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { NavbarService } from '../../services/navbar.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public navbarCollapsed = true;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private userService: UserService,
              private teamService: TeamService,
              public nav: NavbarService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logOut();
    this.teamService.clearTeam(); // clear all team subject data from previous user
    this.userService.clearProfile(); // clear all profile subject data from previous user
    this.flashMessage.show("You're logged out", { cssClass: "alert-success", timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}
