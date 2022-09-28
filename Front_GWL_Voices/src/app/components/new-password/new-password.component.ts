import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  resetToken: string = '';

  constructor(
    private usersService: UsersServiceService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.newPasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
      ]),
      repeatNewPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
      ]),
    }, [this.passwordValidator]);
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.resetToken = params.resettoken;
    });
  }

  async getDataForm() {
    delete this.newPasswordForm.value.repeatNewPassword
    try {
      await this.usersService.newPassword(this.newPasswordForm.value, this.resetToken);
      this.router.navigate(['/login']);
      await Swal.fire({
        title: 'Saved',
        text: 'Your password has been updated',
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

  checkControl(pControlName: string, pError: string): boolean {
    if (this.newPasswordForm.get(pControlName)?.hasError(pError) && this.newPasswordForm.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  checkField(controlName: string): string {
    if (this.newPasswordForm.get(controlName)?.touched) return (!this.newPasswordForm.get(controlName)?.valid && this.newPasswordForm.get(controlName)?.touched) ? 'is-invalid' : 'is-valid';
    else return '';
  }

  passwordValidator(form: AbstractControl): any {
    const newPassword: string = form.get('newPassword')?.value;
    const repeatNewPassword: string = form.get('repeatNewPassword')?.value;
    if (newPassword !== repeatNewPassword && form.get('repeatNewPassword')?.touched) return { 'passwordvalidator': true }
    else {
      return null
    };
  }
}
