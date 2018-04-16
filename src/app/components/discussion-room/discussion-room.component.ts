import { Observable } from 'rxjs/Observable';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { MessagesService } from './message.service';

@Component({
  selector: 'app-discussion-room',
  templateUrl: './discussion-room.component.html',
  styleUrls: ['./discussion-room.component.css'],
  providers: [ MessagesService ]
})
export class DiscussionRoomComponent implements OnInit, OnDestroy {
  @Input() user: any;
  showMessage: boolean = false;
  showEmoji: boolean = false;
  text: string = '';
  public openPopup: Function;

  messages$: Observable<Models.Message[]>;
  onlineUsers$: Observable<any>;
  

  constructor(private chat: ChatService,
              private messages: MessagesService,
              private el: ElementRef,
              ) { }

  ngOnInit() {
       this.messages$ = this.messages.messages;
       this.onlineUsers$ = this.messages.usersOnline;

       this.messages$.subscribe(res => {
         console.log("room....,",res);
        setTimeout(() => {
          this.scrollToBottom();
        });
       })    
  }


  

  setPopupAction(fn: any) {
        this.openPopup = fn;
    }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('#messages');
      if(scrollPane !== null){
        scrollPane.scrollTop = scrollPane.scrollHeight;
      }
  }

  enterChat(event){
    this.showMessage = !this.showMessage;
    if(this.showMessage){
      event.target.innerHTML = '<i class="fas fa-sign-out-alt"></i> Exit dressing room';
      event.target.classList.add("btn-danger");
      event.target.classList.remove("btn-primary");
      this.chat.joinRoom(this.user.team_id, this.user.firstname);
    } else {
      event.target.innerHTML = '<i class="fab fa-facebook-messenger"></i> Enter dressing room';
      event.target.classList.add("btn-primary");
      event.target.classList.remove("btn-danger");
      this.chat.leaveRoom(this.user.team_id, this.user.firstname);
    }
  }

  send(){
    // console.log(msg.value, this.user);
    if(this.text.trim() === ""){
      return;
    }
    this.chat.sendMsg(this.text,this.user.team_id, this.user.firstname);
    this.text = "";
  }

  ngOnDestroy(){
    this.chat.leaveRoom(this.user.team_id, this.user.firstname);

  }
}
