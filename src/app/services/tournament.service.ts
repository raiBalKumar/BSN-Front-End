import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TournamentService {
  tournament$: BehaviorSubject<object[]>;
  // use this variable to pass tournament information for edit action 
  // (using createComponent to render edit form)
  singleTournamentPost: BehaviorSubject<object>;

  constructor(private http: HttpClient, 
              private authService: AuthService) 
              {
                this.tournament$ = new BehaviorSubject([]);
                this.singleTournamentPost = new BehaviorSubject({});
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

  update(id, updateFormData) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
    this.http.put(`${environment.apiServer}/api/organizers/tournament/${id}`, {updateFormData}, options)
      .subscribe((res) => {
        this.listAllTournaments();
      })
  }
}

