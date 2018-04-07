import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfile() {
    // For Authentication
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.get(`${environment.apiServer}/api/users`, options) as Observable<Models.Profile>;
  }

  editProfile(modifier: {}) {
    // For Authentication
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.patch(`${environment.apiServer}/api/users`, modifier, options);
  }

}
