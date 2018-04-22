import { FlashMessagesService } from 'angular2-flash-messages';
import { async } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Rx';
import { NewsService } from '../../services/news.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [NgbProgressbarConfig]
})
export class ProfileComponent implements OnInit, OnDestroy {
  upload: boolean;
  percentDone: number;
  file: File = null;
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

  private news$: Observable<{ status: string, totalResults: number, articles: {}[] }>;
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

  constructor(private userService: UserService,
    private newsService: NewsService,
    private flashMessage: FlashMessagesService,
    private config: NgbProgressbarConfig) {
     
    config.striped = true;
    config.animated = true;
    config.type = 'success';
     }

  ngOnInit() {
    this.userService.reloadProfile();

    this.image = 'assets/img/zizou.png';
    this.user$ = this.userService.getProfile();
    this.newsService.reloadNews();
    this.news$ = this.newsService.getNews();
    this.upload = false;

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

  ngOnDestroy() {
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
  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.upload = true;
      this.file = <File>event.target.files[0];

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localImg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  onUploadFile() {
    if (this.file) {
      this.userService.getPresignedUrl(this.file)
        .then((data) => {
          console.log(data);
          this.userService.uploadToS3(data, this.file)
            .subscribe((event) => {
              if (event['type'] === HttpEventType.UploadProgress) {
               this.percentDone = Math.round(100 * event['loaded'] / event['total']);
                console.log(`File is ${this.percentDone}% uploaded.`);
              } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
                this.userService.updateProfilePic(data)
                  .then((res) => {
                    this.userService.reloadProfile();
                    if (res['success']) {
                      this.upload = false;
                      this.percentDone = null;
                      this.flashMessage.show(res['msg'], {
                        cssClass: 'alert-success',
                        timeout: 3000
                      })
                    } else {
                      this.flashMessage.show(res['msg'], {
                        cssClass: 'alert-danger',
                        timeout: 3000
                      });
                    }
                  });
              }
            })
        })
    } else {
      return;
    }
  }
}
