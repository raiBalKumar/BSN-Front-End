import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {
  createTournamentForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private tournamentService: TournamentService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
   this.createTournamentForm = this._formBuilder.group({
    tournament_name: [null],
    category: [null],
    number_of_teams: [null],
    game_size: [null],
    winner_prize: [null],
    runnerup_prize: [null],
    entry_fee: [null],
    date: [null],
    location: [null]
    
   })
  }

  createTournament() {
    this.tournamentService.createTournament(this.createTournamentForm.value)
      .subscribe(res => {
        this.flashMessage.show("You've created new tournament!", { cssClass: "alert-success", timeout: 3000});
        this.router.navigate(["/tournaments"]);
      })
  }
}
