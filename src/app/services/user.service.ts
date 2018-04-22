import { FlashMessagesService } from 'angular2-flash-messages';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private profile$:BehaviorSubject<Models.Profile>;

  constructor(private http: HttpClient, 
              private authService: AuthService,
              private flashMessage : FlashMessagesService,
              private router: Router) {
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

  getPresignedUrl(pic:File){
    let options = this.createHeaders();
   return this.http.get(`${environment.apiServer}/api/users/getPresignedUrl`, options).toPromise();
  
  }

  uploadToS3(data, pic){
    return this.http.put(data['url'], pic, {
              reportProgress: true,
              observe: 'events',
              headers: {
                'Content-Type': pic.type
                // 'Access-Control-Allow-Origin': '*'
              } 
             });
             
  }
  updateProfilePic(data){
    let options = this.createHeaders();

    let img = 'https://s3.ap-southeast-1.amazonaws.com/soccer-tournament-image/' + data['key'];
              
    return this.http.put(`${environment.apiServer}/api/users/uploadPic`,{img} ,options).toPromise();
          
  }

  createHeaders(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    return { headers: headers };
  }

  // edit user information for facebook login
  editUserInfo(userInfo: Models.userInfoForFacebookLogin) {
    let options = this.createHeaders();
    this.http.patch(`${environment.apiServer}/api/users`, userInfo, options).subscribe((res) => {
      this.authService.storeUserStatus({status: userInfo.status});
      this.reloadProfile();
      this.router.navigate(['/dashboard']);
    })
  }
}
