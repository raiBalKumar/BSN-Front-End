import { FlashMessagesService } from 'angular2-flash-messages';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  private profile$:BehaviorSubject<Models.Profile>;

  constructor(private http: HttpClient, 
              private authService: AuthService,
              private flashMessage : FlashMessagesService) {
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

  uploadPic(pic:File){
    let options = this.createHeaders();
   return this.http.get(`${environment.apiServer}/api/users/getPresignedUrl`, options)
      .subscribe(data=> {
          this.uploadToS3(data, pic);
      })  
  }

  uploadToS3(data, pic){
    return this.http.put(data['url'], pic, {
              headers: {
                'Content-Type': pic.type
              }  }).subscribe(res => this.updateProfilePic(data));
  }
  updateProfilePic(data){
    let options = this.createHeaders();

    let img = 'https://s3.ap-northeast-2.amazonaws.com/building-sports-network/' + data['key'];
              
    return this.http.put(`${environment.apiServer}/api/users/uploadPic`,{img} ,options)
                .subscribe((data)=> {
                  console.log('picture loaded');
                  this.reloadProfile();
                  if(data['success']){
                    this.flashMessage.show(data['msg'],{
                      cssClass: 'alert-success',
                      timeout: 3000
                    })
                  } else {
                    this.flashMessage.show(data['msg'], { 
                      cssClass: 'alert-danger',
                      timeout: 3000
                    });
                  }
                });

  }

  createHeaders(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    return { headers: headers };
  }
}
