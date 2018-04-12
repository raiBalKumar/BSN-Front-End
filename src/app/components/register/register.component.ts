import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output("submit_register") submit = new EventEmitter<{}>();
  formBuilder: FormBuilder;

  userForm = new FormGroup({
    firstname : new FormControl(null,[Validators.required, Validators.minLength(3)]),
    lastname : new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl(null,[Validators.required]),
    status: new FormControl('player')
 },this.passwordMatchValidator);


  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    delete this.userForm.value.confirm_password;
    this.submit.emit(this.userForm.value);
  }

 passwordMatchValidator(password: FormGroup) {
    return password.get('password').value === password.get('confirm_password').value
       ? null : {'mismatch': true};
 }
}
