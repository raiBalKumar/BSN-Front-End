import { ChatService } from './../../services/chat.service';
import { element } from 'protractor';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Event } from '@angular/router';

@Component({
  selector: 'app-player-market',
  templateUrl: './player-market.component.html',
  styleUrls: ['./player-market.component.css']
})
export class PlayerMarketComponent implements OnInit {
  // players: any;
  players$: Observable<any>;
  color: boolean = false;

  constructor(private dashboardService: DashboardService,
              private chat: ChatService) { }

  ngOnInit() {
  }

  search(event) {
    if (event.target.text !== "Hide players in market") {
      this.updatePlayersList();
      event.target.text = "Hide players in market";
      event.target.classList.add('text-white');
      this.color = !this.color;
    } else {
      this.players$ = null;
      event.target.text = "Show players in market";
      event.target.classList.remove('text-white');
      this.color = !this.color;
    }
  }
  updatePlayersList() {
    this.players$ = this.dashboardService.players$;
    this.dashboardService.getPlayers().subscribe(players => {
      this.dashboardService.runNext(players);
    })
  }

  invitation(id: number, event) {
    if (event.target.text === "Invite") {
        event.target.text = "Cancel";
        event.target.classList.remove('btn-info');
        event.target.classList.add('btn-danger');
        this.dashboardService.invitePlayer(id).subscribe((test) => {
          this.chat.sendEvent('Please ask clients to check the request');
          this.chat.messages.subscribe((res)=>{
            if(res['type'] === 'event'){
              this.refresh();
            }   
          })
        console.log(test);
      })
    }else {
      console.log('player_id,',id);
      event.target.text = "Invite";
      event.target.classList.remove('btn-danger');
      event.target.classList.add('btn-info');
      this.dashboardService.cancelInvitation(id).subscribe((test)=>{
        this.chat.sendEvent('The request has been cancelled.')
        this.chat.messages.subscribe((res)=>{
          if(res['type'] === 'event'){
            this.refresh();
          }
        })
         console.log(test);
       });
    }
  }

  playerInfo(id:number){
    console.log(id)
  }

  refresh(){
    this.dashboardService.getPlayers().subscribe(players => {
      this.dashboardService.runNext(players);
    })
  }

}
