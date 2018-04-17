import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private profile$:BehaviorSubject<Models.Profile>;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router)
              {
                this.profile$ = new BehaviorSubject(<Models.Profile>{});
              }

  reloadProfile() {
    // For Authentication
    let options = this.createHeaders();
    this.http.get<Models.Profile>(`${environment.apiServer}/api/users`, options).subscribe((res) => {
      this.profile$.next(res);
    })
  }

  clearProfile(){
    this.profile$.next(<Models.Profile>{});
  }

  getProfile(){
    return this.profile$.asObservable();
  }

  editProfile(modifier: {}) {
    // For Authentication
    let options = this.createHeaders();
    this.http.patch(`${environment.apiServer}/api/users`, modifier, options).subscribe((res) => {
      this.reloadProfile();
    })

  }

  createHeaders(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    return { headers: headers };
  }

  editUserInfo(userId: number, userInfo: Models.userInfoForFacebookLogin) {
    let options = this.createHeaders();
    this.http.put(`${environment.apiServer}/api/users/${userId}`, {userInfo}, options).subscribe((res) => {
      this.authService.status.status = res;
      // console.log(res);
      // console.log(this.authService.status.status);
      this.router.navigate(['/dashboard']);
    })
  }
}
