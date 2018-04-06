import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Injectable()
export class TournamentService {
  tournament$: BehaviorSubject<object[]>;
  // use this variable to pass tournament information for edit component
  singleTournamentPost: BehaviorSubject<object>;

  constructor(private http: HttpClient, 
              private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) 
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
        let successfulMessage = "Successfully created tournament!";
        let errorMessage = "Your tournament have't been saved! Please try again!";
        this.redirectPage(res, successfulMessage, errorMessage);
      })
  }

  update(id, updateFormData) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
    this.http.put(`${environment.apiServer}/api/organizers/tournament/${id}`, {updateFormData}, options)
      .subscribe((res: object) => {
        let successfulMessage = "Successfully updated tournament!";
        let errorMessage = "Your tournament have't been saved! Please try again!";
        this.redirectPage(res, successfulMessage, errorMessage);
    })
  }

  delete(id) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
    this.http.delete(`${environment.apiServer}/api/organizers/tournament/${id}`, (options))
      .subscribe((res: object) => {
        let successfulMessage = "Deleted tournament!";
        let errorMessage = "Your tournament have't been deleted! Please try again!";
        this.redirectPage(res, successfulMessage, errorMessage);
      })
  }

  redirectPage(res, successfulMessage, errorMessage) {
    if (res.success === true) {
      this.flashMessage.show(successfulMessage, {
        cssClass: 'alert-success',
        timeout: 3000
      });
    } else {
        this.flashMessage.show(errorMessage, {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    }
    this.listAllTournaments();
    this.router.navigate(["/tournaments"]);
  }
}

