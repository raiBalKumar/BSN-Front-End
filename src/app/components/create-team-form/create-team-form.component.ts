import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css']
})
export class CreateTeamFormComponent implements OnInit {
@Output() newClub = new EventEmitter<{}>();
  clubForm = new FormGroup({
    clubName: new FormControl(null,[Validators.required, Validators.minLength(4)]),
    numberOfPlayers: new FormControl(null,[Validators.required])
  })

  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    this.newClub.emit(this.clubForm.value);

  }

}
