import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;;
  user: any;
  token: any
  files: any;

  constructor(
    private usersService: UsersServiceService,
    private router: Router,
  ) {
    this.profileForm = new FormGroup({
      name: new FormControl('', []),
      surname: new FormControl('', []),
      phone: new FormControl('', []),
      working_group: new FormControl('', []),
      country: new FormControl('', []),
      image: new FormControl('', []),
      live_in: new FormControl('', []),
      postal_address: new FormControl('', [])
    })
  }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem('token');
    this.user = await this.usersService.getUser(this.token);
    this.user.image = `http://localhost:3000/images/${this.user.image}`
    this.profileForm = new FormGroup({
      name: new FormControl(this.user.name, []),
      surname: new FormControl(this.user?.surname, []),
      email: new FormControl(this.user?.email, []),
      phone: new FormControl(this.user?.phone, []),
      working_group: new FormControl(this.user?.working_group, []),
      country: new FormControl(this.user?.country, []),
      live_in: new FormControl(this.user?.live_in, []),
      postal_address: new FormControl(this.user.postal_address),
      image: new FormControl(),
    })
    if (this.user.image === null) this.user.image = 'http://localhost:3000/images/withoutphoto.jpeg'
    else this.user.image = `${this.user?.image}`
  }

  async getDataForm() {
    let fd = new FormData();
    fd.append('image', this.files);
    fd.append('name', this.profileForm.value.name);
    fd.append('surname', this.profileForm.value.surname);
    fd.append('email', this.profileForm.value.email);
    fd.append('phone', this.profileForm.value.phone);
    fd.append('working_group', this.profileForm.value.working_group);
    fd.append('contry', this.profileForm.value.country);
    fd.append('live_in', this.profileForm.value.live_in);
    fd.append('postal_address', this.profileForm.value.postal_address);
    await this.usersService.updateUser(fd, this.token, this.user.id)
    this.router.navigate(['/dashboard', 'profile']);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Profile saved successfully'
    })
  }

  onChange($event: any) {
    this.files = $event.target.files[0];
  }
}
