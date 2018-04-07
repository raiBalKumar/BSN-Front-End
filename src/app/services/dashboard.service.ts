import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class DashboardService {
  //User info
  private userSubject = new BehaviorSubject<any>([]);
  user$:Observable<any> = this.userSubject.asObservable();
  
  // players in market variable
  private subject = new BehaviorSubject<any>([]);
  players$:Observable<any> = this.subject.asObservable();
  
  constructor(private http: HttpClient, private authService : AuthService) {
   
  }
     
  // check requests for manager 
  checkManagerRequest(): Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token 
      })
    };
    return this.http.get(`${environment.apiServer}/api/managers/getRequests`,httpOptions);
  }

  // check requests for player
  checkPlayerRequest(): Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token 
      })
    };
    return this.http.get(`${environment.apiServer}/api/players/getRequests`,httpOptions);
  }

  // check requests for organizer
  checkOrganizerRequest(): Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token 
      })
    };
    return this.http.get(`${environment.apiServer}/api/organizers/getRequests`,httpOptions);
  }
  
  getUserInfo(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.authService.token 
        })
      };
      return this.http.get(`${environment.apiServer}/api/users/dashboard`, httpOptions).subscribe(user=>{
        console.log("service ..getUserInfo..",user)
        this.userSubject.next(user);
      })
                           
  }


  // show players in the market
  getPlayers(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token 
      })
    };
    return this.http.get(`${environment.apiServer}/api/managers/playerMarket`, httpOptions);
  }
  
  runNext(value){
    return this.subject.next(value);
  }

  // invite player to the club
  invitePlayer(id:number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.token 
      })
    }; 
    return this.http.post(`${environment.apiServer}/api/managers/invitePlayer`,{id},httpOptions);
  }
  // cancel invitation
  cancelInvitation(id:number): Observable<any>{
    console.log('id',id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.token 
      })
    }; 
    return this.http.post(`${environment.apiServer}/api/managers/cancelInvitation`,{id},httpOptions);
  }

  // create new team for manager
  createTeam(team){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.token 
      })
    }; 
    return this.http.post(`${environment.apiServer}/api/managers/createTeam`,team, httpOptions).subscribe(()=>{
      this.getUserInfo();
    });
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token 
    })
  }; 

  // accept request to join the club
  acceptClub(manager_id:number, team_id:number){
    return this.http.post(`${environment.apiServer}/api/players/acceptClub`,{manager_id,team_id},this.httpOptions)
        .subscribe(()=>{
          console.log("update userinfo");
          this.getUserInfo();
        });
  }
  
}
