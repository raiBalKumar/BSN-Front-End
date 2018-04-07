import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { TournamentService } from '../../../services/tournament.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit {
  editTournamentForm: FormGroup;
  editData: any;
  
  constructor(private _formBuilder: FormBuilder,
              private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.singleTournamentPost.subscribe((data) => {
      this.editData = data;
    })

    this.editTournamentForm = this._formBuilder.group({
      tournament_name: [this.editData.tournament_name],
      category: [this.editData.category],
      number_of_teams: [this.editData.number_of_teams],
      game_size: [this.editData.game_size],
      winner_prize: [this.editData.winner_prize],
      runnerup_prize: [this.editData.runnerup_prize],
      entry_fee: [this.editData.entry_fee],
      date: [this.editData.date],
      location: [this.editData.location]
    });
  }

  onUpdate() {
    this.tournamentService.update(this.editData.tournament_id, this.editTournamentForm.value);    
  }
}
