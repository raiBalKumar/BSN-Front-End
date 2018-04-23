import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, Params } from '@angular/router';
import { UserService } from './user.service';
import { Subject } from 'rxjs';

@Injectable()
export class TournamentService {
  // get all tournaments
  tournament$: BehaviorSubject<object[]>;
  // get single tournament
  getSingleTournament: BehaviorSubject<object>;
  // get all fixtures by tournamentId
  fixtures$: Subject<Models.TournamentFixture[]>;
  // get single match by tournamentId
  ranking$: Subject<Models.Ranking[]>
  // get all tournaments for manager
  tournamentForManager: BehaviorSubject<Models.TournamentForManager[]>;


  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private userService: UserService) {
    this.tournament$ = new BehaviorSubject([]);
    this.getSingleTournament = new BehaviorSubject({});
    this.listAllTournaments();
    this.fixtures$ = new Subject();
    this.ranking$ = new Subject();
    this.tournamentForManager = new BehaviorSubject([]);
  }

  // get single tournament post
  get(id: Params) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.get(`${environment.apiServer}/api/organizers/tournament/${id}`, options)
      .subscribe((res: object[]) => {
        this.getSingleTournament.next(res[0]);
      })
  }

  //list all tournaments
  private listAllTournaments() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.get(`${environment.apiServer}/api/organizers/tournament`, options).subscribe((res: object[]) => {
      this.tournament$.next(res);
    })
  }

  // list all tournaments for manager
  listAllTournamentsForManager(teamId: number) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.get<Models.TournamentForManager[]>(`${environment.apiServer}/api/organizers/tournament/team/${teamId}`, options)
      .subscribe((res: Models.TournamentForManager[]) => {
        this.tournamentForManager.next(res);
      })
  }

  // create tournament
  createTournament(tournamentFormValue: object) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.post(`${environment.apiServer}/api/organizers/tournament`, { tournamentFormValue }, options)
      .subscribe((res) => {
        let successfulMessage = "Successfully created tournament!";
        let errorMessage = "Your tournament have't been saved! Please try again!";
        this.redirectPage(res, successfulMessage, errorMessage);
      })
  }

  // update tournament
  update(id: number, updateFormData: object) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.put(`${environment.apiServer}/api/organizers/tournament/${id}`, { updateFormData }, options)
      .subscribe((res: object) => {
        let successfulMessage = "Successfully updated tournament!";
        let errorMessage = "Your tournament have't been saved! Please try again!";
        this.redirectPage(res, successfulMessage, errorMessage);
      })
  }

  // delete tournament
  delete(id: number) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.delete(`${environment.apiServer}/api/organizers/tournament/${id}`, (options))
      .subscribe((res: object) => {
        let successfulMessage = "Deleted tournament!";
        let errorMessage = "Your tournament have't been deleted! Please try again!";
        this.redirectPage(res, successfulMessage, errorMessage);
      })
  }

  // get fixture for single tournament
  getFixture(id: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.get(`${environment.apiServer}/api/organizers/tournament/${id}/fixture`, (options))
      .subscribe((res: Models.TournamentFixture[]) => {
        return this.fixtures$.next(res);
      })
  }

  getFixtureAsObservable(){
    return this.fixtures$.asObservable();
  }

  // get team info for adding fixture
  getTeamInfoForAddingFixture(id: number) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.get<Models.TeamInfoForTournamentFixture>(`${environment.apiServer}/api/organizers/tournament/${id}/getteaminfo`, (options));
  }

  // get fixture for edit
  editFixtureInfo(tournamentId: Params, fixtureId: Params) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.get<Models.TournamentFixtureForEdit>(`${environment.apiServer}/api/organizers/tournament/${tournamentId}/fixture/${fixtureId}`, (options));
  }

  // add tournament fixture
  createFixture(id: number, fixtureValue: Models.CreateTournamentFixture) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.post(`${environment.apiServer}/api/organizers/tournament/${id}/createfixture`, { fixtureValue }, (options))
      .subscribe((res: object) => {
        let successfulMessage = "Successfully created fixture!";
        let errorMessage = "Your fixture have't been created! Please try again!";
        this.notification(res, successfulMessage, errorMessage);
      },
      (err) => {throw new Error()},
      () => this.getFixture(id))
  }

  // update tournament fixture
  updateFixture(fixtureId: Params, tournamentId: Params, fixtureValue: Models.CreateTournamentFixture) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.put<Models.CreateTournamentFixture>(`${environment.apiServer}/api/organizers/tournament/${tournamentId}/fixture/${fixtureId}`, { fixtureValue }, (options));
  }

  // redirect to and update all tournaments page
  redirectPage(res: object, successfulMessage: string, errorMessage: string) {
    this.notification(res, successfulMessage, errorMessage)
    this.listAllTournaments();
    this.router.navigate(["/tournaments/all"]);
  }

  notification(res: object, successfulMessage: string, errorMessage: string) {
    if (res["success"] === true) {
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
  }

  reloadTournamentFixtures(tournamentId: number) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.get<Models.TournamentFixture[]>(`${environment.apiServer}/api/organizers/tournament/${tournamentId}/fixture`, options)
      .subscribe((res) => {
        this.fixtures$.next(res);
      });
  }

  getTournamentFixtures() {
    return this.fixtures$.asObservable();
  }

  getMatch(id: Params) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.get<Models.TournamentFixture[]>(`${environment.apiServer}/api/organizers/tournament/${id}/fixture`, (options))
  }

  updateScore(fixture: Models.TournamentFixture, score: {}) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    let data = { fixture: fixture, score: score };
    this.http.post(`${environment.apiServer}/api/organizers/tournament/score`, data, options)
      .subscribe(res => res)
  }

  reloadRanking(tournamentId: number) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    this.http.get<Models.Ranking[]>(`${environment.apiServer}/api/organizers/tournament/${tournamentId}/ranking`, options)
      .subscribe((res) => {
        this.ranking$.next(res);
      })
  }

  getRanking() {
    return this.ranking$.asObservable();
  }

  // manager send request to join tournament
  requestToJoinTournament(tournamentId: number, teamId: number) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    let data = { tournamentId: tournamentId, teamId: teamId };
    return this.http.post(`${environment.apiServer}/api/managers/joinTournament`, { data }, options);
  }
}

