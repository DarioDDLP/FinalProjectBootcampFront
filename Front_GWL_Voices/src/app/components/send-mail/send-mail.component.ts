import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MailsServiceService } from 'src/app/services/mails-service.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  emailForm: FormGroup;
  idReceiver: number | any;
  user: any;
  receiver: any
  token: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private usersService: UsersServiceService,
    private mailsService: MailsServiceService,
    private router: Router
  ) {
    this.emailForm = new FormGroup({
      subject: new FormControl('', []),
      text: new FormControl('', [])
    })
  }

  async ngOnInit() {
    this.token = localStorage.getItem('token');
    this.activateRoute.params.subscribe(async (params: any) => {
      this.idReceiver = parseInt(params.id);
    });
    try {
      this.receiver = await this.usersService.getById(this.idReceiver, this.token)
    } catch (error) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  async sendEmail() {
    const token = localStorage.getItem('token')
    try {
      if (this.emailForm.value.subject.trim() === '' || this.emailForm.value.text.trim() === '') {
        await Swal.fire({
          title: 'Fail',
          text: 'Subject or body cannot be empty',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
        return
      } else {
        this.user = await this.usersService.getUser(token);
        await this.mailsService.sendEmail(this.emailForm.value, token, this.idReceiver);
        this.router.navigate(['/dashboard', 'members']);
        await Swal.fire({
          title: 'Success',
          text: 'Your message has been sent',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }
}
