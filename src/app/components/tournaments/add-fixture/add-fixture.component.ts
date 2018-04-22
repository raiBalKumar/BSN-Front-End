import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';

@Component({
  selector: '[app-add-fixture]',
  templateUrl: './add-fixture.component.html',
  styleUrls: ['./add-fixture.component.css']
})
export class AddFixtureComponent implements OnInit {
  addFixtureForm: FormGroup;
  @Input() id: number;
  teams: string;
  venues: string;

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.getTeamInfoForAddingFixture(this.id)
      .subscribe((data: Models.TeamInfoForTournamentFixture) => {
        this.teams = data.teams;
        this.venues = data.venues;
      })

    this.addFixtureForm = this._formBuilder.group({
      home_team: [null, Validators.required],
      away_team: [null, Validators.required],
      venue: [null, Validators.required],
      date: [null, Validators.required]
    },{
      validator: this.matchValidator // your validation method
    })
  }

  createFixture() {
    if (this.addFixtureForm.invalid) {
      return;
    } else if (this.addFixtureForm.valid) {
      this.tournamentService.createFixture(this.id, this.addFixtureForm.value);

      this.addFixtureForm.reset();
      this.tournamentService.getFixture(this.id);
    } 
  }

  matchValidator(control: AbstractControl) {
    return control.get('home_team').value == control.get('away_team').value && control.get('home_team').value != null && control.get('away_team').value != null ? {'mismatch': true} : null ;
 }
}
