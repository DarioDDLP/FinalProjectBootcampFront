import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(
    private usersService: UsersServiceService,
    private router: Router
  ) {
    this.forgotForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
    }, []);
  }

  ngOnInit(): void {
  }

  async getDataForm(): Promise<any> {
    try {
      await this.usersService.forgotPassword(this.forgotForm.value)
      this.router.navigate(['/login']);
      await Swal.fire({
        title: 'Success',
        text: 'Please check your email inbox',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err: any) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.forgotForm.get(pControlName)?.hasError(pError) && this.forgotForm.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  checkField(controlName: string): string {
    if (this.forgotForm.get(controlName)?.touched) return (!this.forgotForm.get(controlName)?.valid && this.forgotForm.get(controlName)?.touched) ? 'is-invalid' : 'is-valid';
    else return '';
  }
}
