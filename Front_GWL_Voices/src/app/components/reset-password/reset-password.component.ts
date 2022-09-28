import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  user: any;
  token: any;

  constructor(
    private usersService: UsersServiceService,
    private router: Router
  ) {
    this.resetForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required
      ]),
      newPassword1: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
      ]),
      newPassword2: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
      ]),
    }, [this.passwordValidator]);
  }

  async ngOnInit() {
    this.token = localStorage.getItem('token');
    try {
      this.user = await this.usersService.getUser(this.token);
    } catch (error) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  async getDataForm(): Promise<void> {
    try {
      this.token = localStorage.getItem('token');
      const inputPass = this.resetForm.value.oldPassword;
      const password = this.resetForm.value.newPassword2;
      this.user = await this.usersService.getUser(this.token);
      this.user.inputPass = inputPass;
      await this.usersService.comparePass(this.token, this.user);
      this.user.password = password;
      await this.usersService.updatePassword(this.token, this.user.password);
      this.router.navigate(['/dashboard', 'profile']);
      await Swal.fire({
        title: 'Saved',
        text: 'Password successfully changed',
        icon: 'success',
        confirmButtonText: 'OK'
      });
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
    if (this.resetForm.get(pControlName)?.hasError(pError) && this.resetForm.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  checkField(controlName: string): string {
    if (this.resetForm.get(controlName)?.touched) return (!this.resetForm.get(controlName)?.valid && this.resetForm.get(controlName)?.touched) ? 'is-invalid' : 'is-valid';
    else return '';
  }

  passwordValidator(form: AbstractControl): any {
    const newPassword1: string = form.get('newPassword1')?.value;
    const newPassword2: string = form.get('newPassword2')?.value;
    if (newPassword1 !== newPassword2 && form.get('newPassword2')?.touched) return { 'passwordvalidator': true }
    else {
      return null
    }
  }
}
