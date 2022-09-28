import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private usersService: UsersServiceService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    })
  }

  ngOnInit(): void {
  }

  async getDataForm(): Promise<void> {
    try {
      const response = await this.usersService.login(this.loginForm.value);
      if (response.error) {
        await Swal.fire({
          title: 'Info',
          text: 'Profile disabled, please contact admin',
          icon: 'info',
          confirmButtonText: 'OK'
        });
        return
      }
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.user.id);
        localStorage.setItem('admin', response.user.admin);
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
          title: 'Welcome to your profile'
        })
      }
    } catch (err: any) {
      await Swal.fire({
        title: 'Fail',
        text: err.error.error,
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.loginForm.get(pControlName)?.hasError(pError) && this.loginForm.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  checkField(controlName: string): string {
    if (this.loginForm.get(controlName)?.touched) return (!this.loginForm.get(controlName)?.valid && this.loginForm.get(controlName)?.touched) ? 'is-invalid' : 'is-valid';
    else return '';
  }
}
