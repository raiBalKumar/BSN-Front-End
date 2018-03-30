import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TournamentService {
  tournament$: BehaviorSubject<object[]>;

  constructor(private http: HttpClient, 
              private authService: AuthService) 
              {
                this.tournament$ = new BehaviorSubject([]);
                this.listAllTournaments();
              }

  private listAllTournaments(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
      this.http.get(`${environment.apiServer}/api/organizers/tournament`,options).subscribe((res: any) => {
        this.tournament$.next(res);
      })
  }

  createTournament(tournamentFormValue) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
    this.http.post(`${environment.apiServer}/api/organizers/tournament`, {tournamentFormValue}, options)
      .subscribe((res) => {
        this.listAllTournaments();
      })
  }
}
