import { Component, OnInit } from '@angular/core';
import { FacebookAuthService } from '../../services/facebook-auth.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  ref: NgbModalRef;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private modalService: NgbModal,
              private facebookAuthService: FacebookAuthService) { }

  ngOnInit() {
  }

  open(content) {
    this.ref = this.modalService.open(content);
    this.ref.result.then((result) => {
       
    }, (reason) => {
      
    });
  }

  onSubmitRegister(value:{}){
    console.log("submitted value: ",value);
    this.authService.registerUser(value).subscribe((data)=>{
      if(data.success){
        this.flashMessage.show(data.msg,{
          cssClass: 'alert-success',
          timeout: 3000
        })
      } else {
        this.flashMessage.show(data.msg, { 
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
      
    });
    this.ref.close();
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password 
    }
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        console.log(data);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show("You're now logged In", { 
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['dashboard']);
       } else {
        this.flashMessage.show(data.msg, { 
                                            cssClass: 'alert-danger',
                                            timeout: 3000
                                          });
        this.router.navigate(['login']);
      }
    });
  }
  


  onFacebookLogin() {
    this.facebookAuthService.logIn();
  }

}
