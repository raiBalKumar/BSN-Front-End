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
        console.log("from chat service,",response)
        return response;
      })
   }
  
  // Our interface for sending
  // messages back to our socket.io server
  sendEvent(msg) {
    this.messages.next(msg);
  }
  joinRoom(roomNum,name) {
    let room = "room.join";
    this.messages.next({roomNum,room: room,name})
  }
  sendMsg(msg,room,name){
    let time = Date.now();
    this.messages.next({msg,room,name,time});
  }

}