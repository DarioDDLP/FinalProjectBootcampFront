import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private socket: Socket) { }

  sendMessage(msg: any) {
    this.socket.emit('messageChat', msg);
  }

  getMessage() {
    this.socket.on('messageChat', (message: any) => {
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

  removeListeners() {
    this.socket.removeAllListeners();
  }
}

