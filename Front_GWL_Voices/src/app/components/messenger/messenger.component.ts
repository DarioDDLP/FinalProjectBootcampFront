import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  token: string | any;
  user: | any;
  threads: any;

  constructor(
    private messengerService: MessengerService,
    private usersService: UsersServiceService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem('token');
    try {
      this.user = await this.usersService.getUser(this.token);
      this.threads = await this.messengerService.getAll(this.token)
    } catch (error: any) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  async newMessage() {
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
      try {
        const new_thread = {
          title: text,
          user_id: this.user.id,
          created_at: new Date()
        }
        await this.messengerService.newThread(new_thread, this.token)
        this.threads = await this.messengerService.getAll(this.token)
        await Swal.fire({
          title: 'Success',
          text: 'Thread has been posted',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        await Swal.fire({
          title: 'Fail',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    }
  }

  async changeStatus(id: any): Promise<any> {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to delete this thread?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.messengerService.changeStatus(id, this.token);
          this.threads = await this.messengerService.getAll(this.token)
          Swal.fire('Thread deleted!', '', 'success')
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

  navigate(thread: any) {
    this.router.navigate(['/dashboard', 'messenger', thread.id]);
  }
}
