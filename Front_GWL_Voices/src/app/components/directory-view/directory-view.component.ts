import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DirectoryService } from 'src/app/services/directory.service';
import { MailsServiceService } from 'src/app/services/mails-service.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directory-view',
  templateUrl: './directory-view.component.html',
  styleUrls: ['./directory-view.component.css']
})
export class DirectoryViewComponent implements OnInit {

  token: any;
  user: any;
  contacts: any;
  contact: any;
  emailForm: FormGroup;
  page!: number;

  constructor(
    private userService: UsersServiceService,
    private directoryService: DirectoryService,
    private mailService: MailsServiceService
  ) {
    this.emailForm = new FormGroup({
      subject: new FormControl('', []),
      text: new FormControl('', []),
      mailto: new FormControl('', [])
    })
  }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem('token');
    this.user = await this.userService.getUser(this.token);
    this.contacts = await this.directoryService.getAllContacts(this.token);
  }

  async showRole(id: number) {
    this.contact = await this.directoryService.getById(this.token, id);
    Swal.fire(this.contact.role);
  }

  async showPhone(id: number) {
    this.contact = await this.directoryService.getById(this.token, id);
    Swal.fire(this.contact.phone);
  }

  async deleteContact(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Delete contact?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.contact = await this.directoryService.changeStatus(this.token, id);
          this.contacts = await this.directoryService.getAllContacts(this.token);
        } catch (err: any) {
          await Swal.fire({
            title: 'Fail',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
        Swal.fire('Contact deleted!', '', 'success')
      }
    })
  }

  async sendEmail(mailTo: any) {
    this.emailForm.value.mailto = mailTo;
    try {
      await this.mailService.sendEmailTo(this.emailForm.value, this.token);
      await Swal.fire({
        title: 'Success',
        text: 'Email has been sent',
        icon: 'success',
        confirmButtonText: 'Retry'
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
