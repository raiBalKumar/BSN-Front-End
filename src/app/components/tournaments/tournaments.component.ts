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
  userStatus: object;

  constructor(private tournamentService: TournamentService,
              private router: Router,
              private authService: AuthService) 
              {
                this.userStatus = this.authService.status;
              }
              
  ngOnInit() { 
    this.listAllTournaments = this.tournamentService.tournament$;
  }

  // delete tournament
  onDelete(id: number) {
    this.tournamentService.delete(id);
  }
  
  // send join tournament request
  // sendRequest(e: object) {
    // e.event.target.textContent
    // e.tournament
    // console.log(e["event"].target.textContent)
    // console.log(this.userStatus)
    // e["event"].target.textContent = "Request sent"
  // }
}

