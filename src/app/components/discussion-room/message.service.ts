import { ChatService } from './../../services/chat.service';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';

let initialMessages: Models.Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Models.Message[]): Models.Message[];
}

@Injectable()
export class MessagesService {
  newMessage: Subject<Models.Message> = new Subject<Models.Message>();

  messages: Observable<Models.Message[]>;
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Models.Message> = new Subject<Models.Message>();

  constructor(private chat: ChatService) {
    this.chat.messages.subscribe(res => {
      if (res['type'] !== 'event') {
        console.log(res.data,"its not event");
        this.addMessage(res.data);
      }
    });

    this.messages = this.updates
      .scan((messages: Models.Message[],
        operation: IMessagesOperation) => {
        return operation(messages);
      },
        initialMessages)
      .publishReplay(1)
      .refCount();


    this.create
      .map( (message: Models.Message): IMessagesOperation =>{
        return (messages: Models.Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);

    this.newMessage
      .subscribe(this.create);

  }

  addMessage(message: Models.Message): void {
    this.newMessage.next(message);
  }
}

