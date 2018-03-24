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
    lastname : new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl(null,[Validators.required]),
    role: new FormControl('player')
 },this.passwordMatchValidator);


  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    this.submit.emit(this.userForm.value);
  }

 passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirm_password').value
       ? null : {'mismatch': true};
 }

  


}
