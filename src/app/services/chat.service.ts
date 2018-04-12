import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {
  
  messages: Subject<any>;
  
  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
   }
  
  // Our interface for sending
  // messages back to our socket.io server
  sendEvent(msg) {
    this.messages.next(msg);
  }
  joinRoom(roomNum) {
    let room = "join.room";
    this.messages.next({roomNum,room: room})
  }
  sendMsg(msg,room,name){
    this.messages.next({msg,room,name});
  }

}