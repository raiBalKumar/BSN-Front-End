import { Component, OnInit, AnimationPlayer } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css'],
  providers: [NgbDropdownConfig]
})
export class TournamentsComponent implements OnInit {
  listAllTournaments: Observable<object[]>;
  listAllTournamentsForManager: Observable<Models.TournamentForManager[]>;
  userStatus: any;

  constructor(private tournamentService: TournamentService,
              private router: Router,
              private authService: AuthService,
              private config: NgbDropdownConfig) 
              {
                this.userStatus = this.authService.status;
                config.placement = 'right-top';
              }
              
  ngOnInit() { 
    // if user is manager
    if (this.userStatus.status === "manager") {
      this.tournamentService.listAllTournamentsForManager(this.userStatus.team_id)
      this.listAllTournamentsForManager = this.tournamentService.tournamentForManager;
      this.listAllTournamentsForManager.subscribe(res => console.log(res))
    } 
    // if user is organizer / player
    else {
      this.listAllTournaments = this.tournamentService.tournament$;
    }
  }

  // delete tournament
  async onDelete(id: number) {
    
    const result = await this.swalSetUp();

    if (result.value) {
      this.tournamentService.delete(id);
      swal({
        type: 'success',
        confirmButtonText: 'DELETED!',
        width: 300,
      })
    } else if (result.dismiss === swal.DismissReason.cancel) {
      swal({
        type: 'error',
        confirmButtonText: 'Canceled',
        width: 300,
      })
    }    
  }

  swalSetUp() {
    return swal({
      title: 'Are you sure?',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    })
  }

  joinTournament(tournamentID) {
    this.tournamentService.requestToJoinTournament(tournamentID, this.userStatus.team_id)
      .subscribe(res => {
      this.tournamentService.listAllTournamentsForManager(this.userStatus.team_id);        
      });
  }
}

