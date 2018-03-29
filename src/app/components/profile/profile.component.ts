import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private locations = [
    "Hong Kong Islands",
    "Kowloon",
    "New Territories"
  ];

  private user: Models.Profile;
  private image: string;
  private editing: boolean = false; // To control where editForm should be shown
  private history: {};

  editForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl(null),
    location: new FormControl(null),
  })

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.image = 'assets/img/zizou.png';

    // Get the profile in the first beginning
    this.userService.getProfile().subscribe(
      val => this.retreiveData(val),
      err => { throw err }
    );
  }

  onEdit() {
    this.history = this.editForm.value; //keep a copy of unedited information
    this.editing = true;
  }

  back() {
    this.editForm.patchValue(this.history); //restore a copy of unedited information
    this.editForm.markAsPristine();
    this.editing = false;
  }

  async onSubmit() {
    if (this.editForm.invalid) {
      // Forbid the form from submitting if it is invalid.
      return;
    }

    const result = await this.swalSetUp();

    // Avoid this.user$ = this.userService.getProfile() 
    // When using *ngIf=”user$ | async as user", ngIf will check if user$ is valid eveytime, which means the page will be flash refresh
    if (result.value) {
      this.userService.editProfile(this.editForm.value)
        .flatMap(() => this.userService.getProfile())
        .subscribe(
          val => {
            this.retreiveData(val);
            this.editForm.markAsPristine();
            this.editing = false;
          },
          err => { throw err }
        );

      swal({
          type: 'success',
          confirmButtonText: 'Thank you',
          width: 300,
        })
    } else if (result.dismiss === swal.DismissReason.cancel) {
      swal({
        type: 'error',
        confirmButtonText: 'Canceled',
        width: 300,
      })
    }
  }

  // retreive data from observable & update default value of editForm
  retreiveData(val) {
    this.user = val;
    this.editForm.patchValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      location: this.user.location
    })
  }

  // Using swal lib -> https://github.com/sweetalert2/sweetalert2
  swalSetUp() {
    return swal({
      title: 'Are you sure?',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    })
  }
}
