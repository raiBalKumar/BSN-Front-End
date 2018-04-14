import { DashboardService } from './dashboard.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  // socket connection
  private socket;

  constructor(private dashboardService: DashboardService) { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.apiServer);

    let observable = new Observable(observer => {
      this.socket.on('initial messages', (data) => {
        console.log("from websock, ", data)
        data = {
          type: 'initial messages',
          data: data
        }
        observer.next(data);
      });
      this.socket.on('message', (data) => {
        console.log("incoming msg,", data);
        data = {
          type: 'message',
          data: data
        }
        observer.next(data);
      });
      this.socket.on('event', (data) => {
        data = {
          type: 'event',
          data: data
        }
        observer.next(data);
      });
      // return () => {
      //   this.socket.disconnect();
      // }
    });

    let observer = {
      next: (data: Object) => {
        console.log(data, "data.....");
        if (data['name'] !== undefined) {
          if (data['room'] === 'room.join') {
            this.socket.emit('room.join', data);
          } else {
            this.socket.emit('message', data);
          }
        } else {
          this.socket.emit('event', JSON.stringify(data));
        }
      },
    };

    return Rx.Subject.create(observer, observable);
  }

}
