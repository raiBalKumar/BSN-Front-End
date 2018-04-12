import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { TournamentService } from '../../../services/tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {
  createTournamentForm: FormGroup;

  //set value for form table options
  private categories = ["League"];
  private game_sizes = [6, 7, 9, 11];
  private locations = ["Hong Kong", "Kowloon", "New Territories"];

  constructor(private _formBuilder: FormBuilder,
              private tournamentService: TournamentService,
              private router: Router) { }

  ngOnInit() {
    this.createTournamentForm = this._formBuilder.group({
      tournament_name: [null, [Validators.required, Validators.maxLength(40)]], 
      category: [null, Validators.required],
      number_of_teams: [null, Validators.required],
      game_size: [null, Validators.required],
      winner_prize: [null, Validators.required],
      runnerup_prize: [null, Validators.required],
      entry_fee: [null, Validators.required],
      date: [null, Validators.required],
      location: [null, Validators.required]
    });
  }

  createTournament() {
    if (this.createTournamentForm.valid) {
      this.tournamentService.createTournament(this.createTournamentForm.value);
    }
    else {
      this.router.navigate(['/tournaments'])
    }
  }
}
