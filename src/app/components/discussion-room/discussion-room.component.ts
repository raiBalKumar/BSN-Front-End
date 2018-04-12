import { Observable } from 'rxjs/Observable';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-discussion-room',
  templateUrl: './discussion-room.component.html',
  styleUrls: ['./discussion-room.component.css']
})
export class DiscussionRoomComponent implements OnInit {
  @Input() user: any;
  showMessage: boolean = false;
  messages$ : Observable<any>;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.messages$ = this.chat.messages;
  }

  enterChat(event){
    this.showMessage = !this.showMessage;
    this.chat.joinRoom(this.user.team_id);
    if(this.showMessage){
      event.target.text = "Exit dressing room";
      event.target.classList.add("btn-danger");
      event.target.classList.remove("btn-primary");
    } else {
      event.target.text = "Enter dressing room";
      event.target.classList.add("btn-primary");
      event.target.classList.remove("btn-danger");
    }
   
  }

  send(msg){
    console.log(msg.value, this.user);
    this.chat.sendMsg(msg.value,this.user.team_id, this.user.firstname);
  }

}
