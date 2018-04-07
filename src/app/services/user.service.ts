import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
<<<<<<< HEAD
  
  
  constructor(private http: HttpClient, private authService: AuthService) { }
||||||| merged common ancestors
  constructor(private http: HttpClient, private authService: AuthService) { }
=======
  private profile$:BehaviorSubject<Models.Profile>;
>>>>>>> df6596f8f64ab59f9d6594ba3e84212b70e99c4d

  constructor(private http: HttpClient, private authService: AuthService) {
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
}
