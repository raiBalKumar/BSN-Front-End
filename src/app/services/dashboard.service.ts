import { ChatService } from './chat.service';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';



@Injectable()
export class DashboardService {
  //User info
  private userSubject = new Subject<Object>();
  user$:Observable<any> = this.userSubject.asObservable();
  
  // players in market variable
  private subject = new BehaviorSubject<any>([]);
  players$:Observable<any> = this.subject.asObservable();
  
  constructor(private http: HttpClient, 
              private authService : AuthService,
             ) {
   
  }
     
  // check requests for manager 
  checkManagerRequest(): Observable<any> { 
    let httpOptions = this.createHeaders();
    return this.http.get(`${environment.apiServer}/api/managers/getRequests`,httpOptions);
  }

  // check requests for player
  checkPlayerRequest(): Observable<any> { 
    let httpOptions = this.createHeaders();
    return this.http.get(`${environment.apiServer}/api/players/getRequests`,httpOptions);
  }

  // check requests for organizer
  checkOrganizerRequest(): Observable<any> { 
    let httpOptions = this.createHeaders();
    return this.http.get(`${environment.apiServer}/api/organizers/getRequests`,httpOptions);
  }
  
  getUserInfo(){
    let httpOptions = this.createHeaders();
      return this.http.get(`${environment.apiServer}/api/users/dashboard`, httpOptions).subscribe(user=>{
        console.log("service ..getUserInfo..",user)
        this.userSubject.next(user);
      })
                           
  }

  // show players in the market
  getPlayers(): Observable<any>{
    let httpOptions = this.createHeaders();
    return this.http.get(`${environment.apiServer}/api/managers/playerMarket`, httpOptions);
  }
  
  runNext(value){
    return this.subject.next(value);
  }

  // invite player to the club
  invitePlayer(id:number): Observable<any>{
    let httpOptions = this.createHeaders();
    return this.http.post(`${environment.apiServer}/api/managers/invitePlayer`,{id},httpOptions);
  }
  // cancel invitation
  cancelInvitation(id:number): Observable<any>{
    let httpOptions = this.createHeaders();
    return this.http.post(`${environment.apiServer}/api/managers/cancelInvitation`,{id},httpOptions);
  }

  // create new team for manager
  createTeam(team){
    let httpOptions = this.createHeaders();
    return this.http.post(`${environment.apiServer}/api/managers/createTeam`,team, httpOptions).subscribe(()=>{
      this.getUserInfo();
    });
  }
  
  // accept request to join the club
  acceptClub(manager_id:number, team_id:number){
    let httpOptions = this.createHeaders();
    return this.http.post(`${environment.apiServer}/api/players/acceptClub`,{manager_id,team_id},httpOptions);
       
  }

  rejectClub(manager_id:number) {
    let httpOptions = this.createHeaders();
    return this.http.post(`${environment.apiServer}/api/players/rejectClub`,{manager_id},httpOptions);
            
  }

  createHeaders(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    return { headers: headers };
  }

  leaveClub(){
    console.log("service leave");
    let httpOptions = this.createHeaders();
    return this.http.get(`${environment.apiServer}/api/players/leaveTeam`,httpOptions)
              .subscribe(()=>{
                console.log("left the club");
                this.getUserInfo();
              })
  }
  
}
