import { async } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Rx';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  file:File = null;
  localImg: File = null;
  private locations = [
    "Hong Kong Islands",
    "Kowloon",
    "New Territories"
  ];

  private positions = [
    "Goal Keeper",
    "Center Back",
    "Left Back",
    "Right Back",
    "Center Defensive Midfielder",
    "Central Midfielder",
    "Left Wing",
    "Right Wing",
    "Striker"
  ]

  private news$: Observable<{status: string, totalResults: number, articles: {}[]}>;
  private user$: Observable<Models.Profile>;
  private image: string;
  private editing: boolean = false; // To control where editForm should be shown
  private history: {}; // To keep a copy of unedited information
  private formSubscription: Subscription;

  editForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl(null),
    location: new FormControl(null),
    position: new FormControl(null),
  })

  constructor(private userService: UserService, private newsService: NewsService) { }

  ngOnInit() {
    this.userService.reloadProfile();

    this.image = 'assets/img/zizou.png';
    this.user$ = this.userService.getProfile();
    this.newsService.reloadNews();
    this.news$ = this.newsService.getNews();

    // set default value to the form
    this.formSubscription = this.user$.subscribe((res) => {
      this.editForm.patchValue({
        firstname: res.firstname,
        lastname: res.lastname,
        location: res.location,
        position: res.position,
      })
    })
  }

  ngOnDestroy(){
    // prevent many subscription
    this.formSubscription.unsubscribe();
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

    if (result.value) {
      this.userService.editProfile(this.editForm.value);
      this.editing = false;

      swal({
        type: 'success',
        confirmButtonText: 'DONE!',
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

  // upload image
  onFileSelected(event){
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localImg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  }

  }
  onUploadFile(){
    if(this.file){
      this.userService.uploadPic(this.file);
    }else{
      return;
    }
  }
}
