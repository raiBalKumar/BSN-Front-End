import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  userId: number;
  userInformation: FormGroup;

  // set value to select option
  private locations = ["Hong Kong", "Kowloon", "New Territories"];  
  private status = ['Player', 'Manager', 'Organizer'];

  constructor(private _formBuilder: FormBuilder,
              private tournamentService: TournamentService,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.authService.userId;
    this.userInformation = this._formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      location: [null, [Validators.required]],
      status: [null, [Validators.required]]
    })

    
  }

  updateUserInfo() {
    if (this.userInformation.valid) {
      this.userService.editUserInfo(this.userId, this.userInformation.value);
    }
  }
}
