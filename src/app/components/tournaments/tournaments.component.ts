import { Component, OnInit, AnimationPlayer } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  listAllTournaments: Observable<object[]>;
  listAllTournamentsForManager: Observable<Models.TournamentForManager[]>;
  userStatus: any;

  constructor(private tournamentService: TournamentService,
              private router: Router,
              private authService: AuthService) 
              {
                this.userStatus = this.authService.status;
              }
              
  ngOnInit() { 
    // if user is manager
    if (this.userStatus.status === "manager") {
      this.tournamentService.listAllTournamentsForManager(this.userStatus.team_id)
      this.listAllTournamentsForManager = this.tournamentService.tournamentForManager;
    } 
    // if user is organizer / player
    else {
      this.listAllTournaments = this.tournamentService.tournament$;
    }
  }

  // delete tournament
  onDelete(id: number) {
    console.log(id)
    this.tournamentService.delete(id);
    console.log(id);
  }

  joinTournament(tournamentID) {
    this.tournamentService.requestToJoinTournament(tournamentID, this.userStatus.team_id)
      .subscribe(res => {
      this.tournamentService.listAllTournamentsForManager(this.userStatus.team_id);        
      });
  }
}

