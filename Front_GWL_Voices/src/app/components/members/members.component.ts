import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  user: any
  members: any
  token: any;
  status: any;
  page!: number;

  constructor(
    private usersService: UsersServiceService
  ) { }

  async ngOnInit() {
    this.token = localStorage.getItem('token');
    this.user = await this.usersService.getUser(this.token);
    if (this.user.admin === 1) {
      const response = await this.usersService.getAll(this.token);
      this.members = response;
    } else if (this.user.admin === 0) {
      const response = await this.usersService.getAllByStatus({ status: 1 }, this.token);
      this.members = response;
    }
  }

  async filterByName($event: any) {
    const name = $event.target.value.toLowerCase();
    const token = localStorage.getItem('token');
    const response = await this.usersService.getAll(token);
    this.members = response.filter((value: any) => {
      return value.name.toLowerCase().includes(name);
    });
  }

  async filterByStatus($event: any) {
    this.status = $event.target.value;
    if (this.status === "") return this.members = await this.usersService.getAll(this.token);
    else {
      try {
        const status = {
          status: this.status
        }
        const response = await this.usersService.getAllByStatus(status, this.token);
        this.members = response;
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

  async disableEnable(member: any) {
    try {
      await this.usersService.changeStatus(member, this.token);
      const status = {
        status: member.status
      }
      if (!this.status) return this.members = await this.usersService.getAll(this.token);
      this.members = await this.usersService.getAllByStatus(status, this.token);
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

