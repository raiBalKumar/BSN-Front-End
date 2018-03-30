import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  listAllTournaments: Observable<object[]>;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {    
      this.listAllTournaments = this.tournamentService.tournament$;    
  }
}
