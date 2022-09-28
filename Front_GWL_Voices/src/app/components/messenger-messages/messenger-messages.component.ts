import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messenger-messages',
  templateUrl: './messenger-messages.component.html',
  styleUrls: ['./messenger-messages.component.css']
})
export class MessengerMessagesComponent implements OnInit {

  messages: any;
  postId: any;
  token: any;
  titlePost: any;
  user: any

  constructor(
    private activateRoute: ActivatedRoute,
    private messengerService: MessengerService,
    private usersService: UsersServiceService
  ) { }

  async ngOnInit() {
    this.token = localStorage.getItem('token');
    this.activateRoute.params.subscribe(async (params: any) => {
      this.postId = parseInt(params.id);
    });
    try {
      this.user = await this.usersService.getUser(this.token)
      const posts = await this.messengerService.getAll(this.token)
      const post = posts.find((value: any) => { return value.id === this.postId });
      this.titlePost = post.title
      this.messages = await this.messengerService.getByPostId(this.token, this.postId);
    } catch (err: any) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  async newAnswer() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    if (text) {
      const obj = {
        text: text
      }
      try {
        await this.messengerService.newAnswer(this.token, obj, this.postId);
        this.messages = await this.messengerService.getByPostId(this.token, this.postId);
        await Swal.fire({
          title: 'Success',
          text: 'Your message has been posted',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error: any) {
        await Swal.fire({
          title: 'Fail',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    }
  }

  async delete(id: any): Promise<any> {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to delete this message?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.messengerService.logicDropThreadMessage(this.token, this.postId, id);
          this.messages = await this.messengerService.getByPostId(this.token, this.postId);
          Swal.fire('Message deleted!', '', 'success')
        } catch (err: any) {
          await Swal.fire({
            title: 'Fail',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
      }
    })
  }
}
