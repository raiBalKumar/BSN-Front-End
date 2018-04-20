import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private authService: AuthService, public nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
  }

  ngOnDestroy(){
    this.nav.show();
  }

}
