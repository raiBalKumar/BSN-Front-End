import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment} from '../../environments/environment';
import { Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { FacebookAuthService } from './facebook-auth.service';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthService {
  token: string = null;
  // status:Observable<any>;
  // user$: Observable<Models.User>;

  constructor(private router: Router,
              private http: HttpClient,
              private facebookAuthService: FacebookAuthService) 
              {
                this.token = localStorage.getItem('myToken');
                // this.status = JSON.parse(localStorage.getItem('status'));
                // this.user$ = JSON.parse(localStorage.getItem('user'));
              }


  facebookLogin(access_token){
    return this.http.post(`${environment.apiServer}/api/auth/login/facebook`,{access_token:access_token})
      .subscribe((res: any)=>{
        this.token = res.token;
        localStorage.setItem('myToken',this.token);
        this.router.navigate(['/profile']);
      },(err)=>{
          alert("You are not logged in. Dude!");
      });
  }
  
  authenticateUser(user): Observable<any>{
    return this.http.post(`${environment.apiServer}/api/auth/login`, user); 
  }

  registerUser(user): Observable<any>{
    return this.http.post(`${environment.apiServer}/api/auth/register`,user);           
  }

  storeUserData(token){
    localStorage.setItem('myToken', token);
    // localStorage.setItem('status', status);
    // localStorage.setItem('status', JSON.stringify(status));
    this.token = token;
    // this.status = status;
  }

  // getStatus(){
  //   return this.status;
  // }

  isAuthenticated(){
    return this.token != null;
  }

  logOut(){
    this.token = null;
    // this.status = null;
    this.facebookAuthService.logOut();
    localStorage.removeItem('myToken');
    // localStorage.removeItem('status');
  }
}
