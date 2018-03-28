import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { FacebookAuthService } from './facebook-auth.service';


@Injectable()
export class AuthService {
  token: string = null;
  user$: Observable<Models.User>;

  constructor(private router: Router,
              private http: HttpClient,
              private facebookAuthService: FacebookAuthService) 
              {
                this.token = localStorage.getItem('myToken');
                this.user$ = JSON.parse(localStorage.getItem('user'));
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

  storeUserData(token, user){
    localStorage.setItem('myToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user$ = user;
  }

  getUser(){
    return this.user$;
  }

  isAuthenticated(){
    return this.token != null;
  }

  logOut(){
    this.token = null;
    this.user$ = null;
    this.facebookAuthService.logOut();
    localStorage.removeItem('myToken');
  }
}
