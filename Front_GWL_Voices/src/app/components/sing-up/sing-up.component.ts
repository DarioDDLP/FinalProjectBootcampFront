import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  singupForm: FormGroup;

  constructor(
    private usersService: UsersServiceService,
    private router: Router
  ) {
    this.singupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      surname: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
      ]),
      repeatPass: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
      ]),
    }, [this.passwordValidator]);
  }

  ngOnInit(): void {
  }

  async getDataForm(): Promise<void> {
    const token = localStorage.getItem('token')
    delete this.singupForm.value.repeatPass;
    try {
      await this.usersService.registerUser(token, this.singupForm.value);
      this.router.navigate(['/dashboard', 'members']);
      await Swal.fire({
        title: 'Registered',
        text: 'User successfully registered',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.singupForm.get(pControlName)?.hasError(pError) && this.singupForm.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  checkField(controlName: string): string {
    if (this.singupForm.get(controlName)?.touched) return (!this.singupForm.get(controlName)?.valid && this.singupForm.get(controlName)?.touched) ? 'is-invalid' : 'is-valid';
    else return '';
  }

  passwordValidator(form: AbstractControl): any {
    const password: string = form.get('password')?.value;
    const repeatPass: string = form.get('repeatPass')?.value;
    if (password !== repeatPass && form.get('repeatPass')?.touched) return { 'passwordvalidator': true };
    else return null
  }
}

