import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TournamentService {
  // private behaviouSubject: BehaviorSubject<object[]>;

  constructor(private http: HttpClient, 
              private authService: AuthService) { 
                // this.behaviouSubject = new BehaviorSubject()
              }

  listAllTournaments(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
    return this.http.get(`${environment.apiServer}/api/organizers/tournament`,options);
  }

  createTournament(tournamentFormValue) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
    return this.http.post(`${environment.apiServer}/api/organizers/tournament`, {tournamentFormValue}, options);
  }
}
