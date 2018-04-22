import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanActivate{
  constructor(private authService: AuthService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(this.authService.status.status)
    if(!(this.authService.status.status == "player" || this.authService.status.status == "manager" || this.authService.status.status == "organizer")){
        this.router.navigate(['/role'])
    } 
    return true;
}
}
