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
<<<<<<< HEAD
  // user$: Observable<Models.User>;

=======
  user:any;
  
>>>>>>> e80dbf7e7c8fe42782435da5d01dd5e27d2d0929
  constructor(private router: Router,
              private http: HttpClient,
              private facebookAuthService: FacebookAuthService) 
              {
                this.token = localStorage.getItem('myToken');
<<<<<<< HEAD
                // this.user$ = JSON.parse(localStorage.getItem('user'));
=======
                this.user = JSON.parse(localStorage.getItem('user'));
>>>>>>> e80dbf7e7c8fe42782435da5d01dd5e27d2d0929
              }


  facebookLogin(access_token){
    return this.http.post(`${environment.apiServer}/api/auth/facebook`,{access_token:access_token})
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
    // localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
<<<<<<< HEAD
    // this.user$ = user;
  }

  // getUser(){
  //   return this.user$;
  // }
=======
    this.user = user;
  }

  getUser(){
    return this.user;
  }
>>>>>>> e80dbf7e7c8fe42782435da5d01dd5e27d2d0929

  isAuthenticated(){
    return this.token != null;
  }

  logOut(){
    this.token = null;
<<<<<<< HEAD
    // this.user$ = null;
=======
    this.user = null;
>>>>>>> e80dbf7e7c8fe42782435da5d01dd5e27d2d0929
    this.facebookAuthService.logOut();
    localStorage.removeItem('myToken');
    localStorage.removeItem('user');
  }
}
