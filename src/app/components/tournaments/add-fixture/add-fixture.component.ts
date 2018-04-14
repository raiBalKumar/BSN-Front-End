import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';

@Component({
  selector: 'app-add-fixture',
  templateUrl: './add-fixture.component.html',
  styleUrls: ['./add-fixture.component.css']
})
export class AddFixtureComponent implements OnInit {
  addFixtureForm: FormGroup;
  id: Params;
  teams: string;
  venues: string;
;
  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private tournamentService: TournamentService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tournamentService.getTeamInfoForAddingFixture(this.id)
        .subscribe((data: Models.TeamInfoForTournamentFixture) => {
          this.teams = data.teams;
          this.venues = data.venues;
        })
      })

    this.addFixtureForm = this._formBuilder.group({
      home_team: [null, Validators.required],
      away_team: [null, Validators.required],
      venue: [null, Validators.required],
      date: [null, Validators.required]
    })
  }

  createFixture() {
    if (this.addFixtureForm.valid) {
      this.tournamentService.createFixture(this.id, this.addFixtureForm.value);
    } else {
      this.router.navigate(['/tournaments'])
    }
  }
}
