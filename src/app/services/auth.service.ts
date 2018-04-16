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
  status:any;
  
 
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
    localStorage.setItem('myToken',this.token);
    
    // check user status
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    let options = {headers:headers};
    this.http.get<Models.Profile>(`${environment.apiServer}/api/users`, options).subscribe((res) => {
      if (res.status === null) {
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    })

      // .subscribe((res: any)=>{
      //   this.token = res.token;
      //   localStorage.setItem('myToken',this.token);

      //   this.router.navigate(['/profile']);
      // }
      // ,(err)=>{
      //     alert("You are not logged in. Dude!");
      // });
  }
  
  authenticateUser(user): Observable<any>{
    return this.http.post(`${environment.apiServer}/api/auth/login`, user); 
  }

  registerUser(user): Observable<any>{
    return this.http.post(`${environment.apiServer}/api/auth/register`,user);           
  }

  storeUserData(token ,status){
    localStorage.setItem('myToken', token);
    localStorage.setItem('status', JSON.stringify(status));
    console.log(status,"status");
    this.token = token;
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
