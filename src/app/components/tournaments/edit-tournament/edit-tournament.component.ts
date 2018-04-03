import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { TournamentService } from '../../../services/tournament.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit {
  editTournamentForm: FormGroup;
  tournament: any;
  id: Params;
  
  constructor(private _formBuilder: FormBuilder,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tournamentService.get(this.id);
    });

    this.tournamentService.getSingleTournament.subscribe(data => {
      this.tournament = data;

      // inject tournament data into form
      this.editTournamentForm = this._formBuilder.group({
        tournament_name: [this.tournament.tournament_name],
        category: [this.tournament.category],
        number_of_teams: [this.tournament.number_of_teams],
        game_size: [this.tournament.game_size],
        winner_prize: [this.tournament.winner_prize],
        runnerup_prize: [this.tournament.runnerup_prize],
        entry_fee: [this.tournament.entry_fee],
        date: [null/*this.tournament.date*/],
        location: [this.tournament.location]
      });
    })
  }

  onUpdate() {
    this.tournamentService.update(this.tournament.tournament_id, this.editTournamentForm.value);    
  }
}
