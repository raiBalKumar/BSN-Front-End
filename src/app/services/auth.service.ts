import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment} from '../../environments/environment';
import { Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { FacebookAuthService } from './facebook-auth.service';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthService {
  token: string = null;
  status:any = {};
  userId: number;  
 
  constructor(private router: Router,
              private http: HttpClient,
              private facebookAuthService: FacebookAuthService) 
              {
                if(localStorage.getItem('myToken')){
                  this.token = localStorage.getItem('myToken');
                }
                if(JSON.parse(localStorage.getItem('status'))){
                  this.status = JSON.parse(localStorage.getItem('status'));
                }
              }


 async facebookLogin(access_token){
    let result = await this.http.post(`${environment.apiServer}/api/auth/login/facebook`,{access_token:access_token}).toPromise();
    this.token = result['token'];
    this.storeUserToken(this.token);

    // check user status
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    let options = {headers:headers};
    this.http.get<Models.Profile>(`${environment.apiServer}/api/users`, options).subscribe((res) => {
      if (res.status === null) {
        this.router.navigate(['/role']);
      } else {
        this.storeUserStatus({status: res.status})
        this.router.navigate(['/dashboard']);
      }
    })
  }
  
  authenticateUser(user): Observable<any>{
    return this.http.post(`${environment.apiServer}/api/auth/login`, user); 
  }

  registerUser(user): Observable<any>{
    return this.http.post(`${environment.apiServer}/api/auth/register`,user);           
  }

  storeUserData(token ,status){
    this.storeUserToken(token);
    this.storeUserStatus(status);
    console.log(status,"status");
  }

  storeUserToken(token){
    localStorage.setItem('myToken', token);
    this.token = token;
  }

  storeUserStatus(status){
    localStorage.setItem('status', JSON.stringify(status));
    this.status = status;
  }

  isAuthenticated(){
    return this.token != null;
  }

  logOut(){
    this.token = null;
    this.status = null;
    this.facebookAuthService.logOut();
    localStorage.removeItem('myToken');
    localStorage.removeItem('status');
  }
}
