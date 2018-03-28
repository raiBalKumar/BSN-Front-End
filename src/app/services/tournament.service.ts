import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class TournamentService {

  constructor(private http: HttpClient, 
              private authService: AuthService) {}

  listAllTournaments(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
    return this.http.get(`${environment.apiServer}/api/organizers/tournament`,options);
  }
}
