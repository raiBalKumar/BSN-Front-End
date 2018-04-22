import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-fixture',
  templateUrl: './edit-fixture.component.html',
  styleUrls: ['./edit-fixture.component.css']
})
export class EditFixtureComponent implements OnInit {
  datePipe = new DatePipe('en-US');
  fixtureId: Params;
  tournamentId: Params;
  fixtures: {}[]; 
  teams; //better to change later
  venues: string[];

  editFixtureForm: FormGroup = this._formBuilder.group({
    home_team: [null, Validators.required],
    away_team: [null, Validators.required],
    venue: [null, Validators.required],
    date: [null, Validators.required]
  })

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

        this.editFixtureForm.patchValue({
          home_team: this.teams[0].home_team,
          away_team: this.teams[0].away_team,
          venue: this.teams[0].venue,
          date: this.datePipe.transform(this.teams[0].date, 'yyyy-MM-ddThh:mm:ss.SSS', '+0800' )
        })
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
