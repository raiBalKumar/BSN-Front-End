import { Component, OnInit, AnimationPlayer } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  listAllTournaments: Observable<object[]>;

  constructor(private tournamentService: TournamentService,
              private router: Router) { }

  ngOnInit() {    
      this.listAllTournaments = this.tournamentService.tournament$;    
  }

  onEdit(tournament) {
    // this.tournamentService.singleTournamentPost = tournament;
    this.tournamentService.singleTournamentPost.next(tournament);

    this.router.navigate(["/tournament/edit", tournament.tournament_id]);
  }
}

