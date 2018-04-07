import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamService {
  private teamInfo$: BehaviorSubject<Models.TeamInformation>;
  private fixtures$: BehaviorSubject<Models.TeamFixtures[]>;
  private squad$: BehaviorSubject<Models.TeamSquad[]>;

  private teamId: number;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.teamInfo$ = new BehaviorSubject(<Models.TeamInformation>{});
    this.fixtures$ = new BehaviorSubject([]);
    this.squad$ = new BehaviorSubject([]);
  }

  reloadTeam() {
    let options = this.authHeaders();
    return this.http.get<Models.Profile>(`${environment.apiServer}/api/users`, options).subscribe(res => {
      this.teamId = res.team_id;

      this.http.get<Models.TeamFixtures[]>(`${environment.apiServer}/api/teams/${this.teamId}/status?type=fixtures`, options)
        .subscribe((res) => {
          this.fixtures$.next(res);
        });

      this.http.get<Models.TeamSquad[]>(`${environment.apiServer}/api/teams/${this.teamId}/status?type=squad`, options)
        .subscribe((res) => {
          this.squad$.next(res);
        });

      this.http.get<Models.TeamInformation>(`${environment.apiServer}/api/teams/${this.teamId}`, options)
        .subscribe((res) => {
          this.teamInfo$.next(res);
        });
    })
  }

  clearTeam(){
    this.fixtures$.next([]);
    this.squad$.next([]);
    this.teamInfo$.next(<Models.TeamInformation>{});
  }

  getTeamInformation() {
    return this.teamInfo$.asObservable();
  }

  getSquad() {
    return this.squad$.asObservable();
  }

  getFixtures() {
    return this.fixtures$.asObservable();
  }

  getUpcomingMatch() {
    return this.fixtures$.asObservable().pipe(
      map(fixtures => fixtures[0])
    );
  }

  authHeaders() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    return { headers: headers };
  }
}
