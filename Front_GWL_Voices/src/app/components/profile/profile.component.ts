import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    private usersServices: UsersServiceService,
  ) { }

  async ngOnInit() {
    const token = localStorage.getItem('token');
    try {
      this.user = await this.usersServices.getUser(token);
      if (this.user.image === null) this.user.image = 'http://localhost:3000/images/withoutphoto.jpeg'
      else this.user.image = `http://localhost:3000/images/${this.user?.image}`
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
