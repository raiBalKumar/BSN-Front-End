import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { TournamentService } from '../../../services/tournament.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit {
  editTournamentForm: FormGroup;
  tournament: any;
  id: Params;

  //set value for form table options
  private categories = ["Knockout", "League"];
  private game_sizes = [6, 7, 9, 11];
  private locations = ["Hong Kong", "Kowloon", "New Territories"];
  
  constructor(private _formBuilder: FormBuilder,
              private tournamentService: TournamentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tournamentService.get(this.id);
    });

    this.tournamentService.getSingleTournament.subscribe(data => {
      this.tournament = data;

      // inject tournament data into form
      this.editTournamentForm = this._formBuilder.group({
        tournament_name: [this.tournament.tournament_name, [Validators.required, Validators.maxLength(40)]],
        category: [this.tournament.category, Validators.required],
        number_of_teams: [this.tournament.number_of_teams, Validators.required],
        game_size: [this.tournament.game_size, Validators.required],
        winner_prize: [this.tournament.winner_prize, Validators.required],
        runnerup_prize: [this.tournament.runnerup_prize, Validators.required],
        entry_fee: [this.tournament.entry_fee, Validators.required],
        date: [moment(this.tournament.date).format('YYYY-MM-DD'), Validators.required],
        location: [this.tournament.location, Validators.required]
      });
    })
  }

  onUpdate() {
    this.tournamentService.update(this.tournament.tournament_id, this.editTournamentForm.value);    
  }
}
