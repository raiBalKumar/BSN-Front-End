import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-fixture',
  templateUrl: './edit-fixture.component.html',
  styleUrls: ['./edit-fixture.component.css']
})
export class EditFixtureComponent implements OnInit {
  editFixtureForm: FormGroup;
  fixtureId: Params;
  tournamentId: Params;
  fixtures: string[];
  teams: string[];
  venues: string[];

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private tournamentService: TournamentService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.fixtureId = params['fixtureId'];
      this.tournamentId = params['tournamentId'];
    })

    this.tournamentService.editFixtureInfo(this.tournamentId, this.fixtureId)
      .subscribe((data: Models.TournamentFixtureForEdit) => {
        this.fixtures = data.fixtures;
        this.teams = data.teams;
        this.venues = data.venues;
      })
      
    this.editFixtureForm = this._formBuilder.group({
      home_team: [null, Validators.required],
      away_team: [null, Validators.required],
      venue: [null, Validators.required],
      date: [null, Validators.required]
    })

  }

  updateFixture() {
    if (this.editFixtureForm.valid) {
      this.tournamentService.updateFixture(this.fixtureId, this.tournamentId, this.editFixtureForm.value)
        .subscribe(() => {
          this.router.navigate([`/tournament/${this.tournamentId}/fixture`]);
        })
    }
  }
}
