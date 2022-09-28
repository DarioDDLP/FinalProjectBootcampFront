import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollChat') scrollChat!: ElementRef
  messageList: any = [];
  @Input() message: any;
  user: any;

  constructor(
    private webSocketService: WebSocketService,
    private usersService: UsersServiceService
  ) {
    const welcome = {
      username: '[SERVER]',
      text: 'Welcome to GWLChat',
      created_at: new Date()
    }
    this.messageList.push(welcome);
  }

  async ngOnInit() {
    const token = localStorage.getItem('token');
    try {
      this.user = await this.usersService.getUser(token);
      await this.webSocketService.getMessage().subscribe((message: string) => {
        this.messageList = this.messageList.filter((value: any) => value !== '')
        this.messageList.push(message);
      })
    } catch (error: any) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.webSocketService.removeListeners();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    const email = this.user.email
    const substring = email.split('@')
    const username = substring[0]
    const obj = {
      username: username,
      text: this.message,
    }
    this.webSocketService.sendMessage(obj);
    this.message = ""
  }

  sendMessage2(event: any) {
    if (event.key === 'Enter') {
      const email = this.user.email
      const substring = email.split('@')
      const username = substring[0]
      const obj = {
        username: username,
        text: this.message,
      }
      this.webSocketService.sendMessage(obj);
      this.message = ""
    }
  }

  scrollToBottom() {
    try {
      this.scrollChat.nativeElement.scrollTop = this.scrollChat.nativeElement.scrollHeight;
    } catch (err) { }
  }
}