import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DirectoryService } from 'src/app/services/directory.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directory-register',
  templateUrl: './directory-register.component.html',
  styleUrls: ['./directory-register.component.css']
})
export class DirectoryRegisterComponent implements OnInit {

  directoryForm: FormGroup;
  token: string | any;

  constructor(
    private directoryService: DirectoryService,
    private router: Router
  ) {
    this.directoryForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      surname: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', []),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      role: new FormControl('', [
        Validators.required
      ]),
    })
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  async getDataForm() {
    try {
      await this.directoryService.newContact(this.directoryForm.value, this.token);
      this.router.navigate(['/dashboard', 'directory']);
      await Swal.fire({
        title: 'Success',
        text: 'Contact has been saved',
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
  };

  checkControl(pControlName: string, pError: string): boolean {
    if (this.directoryForm.get(pControlName)?.hasError(pError) && this.directoryForm.get(pControlName)?.touched) {
      return true
    } else {
      return false
    };
  };

  checkField(controlName: string): string {
    if (this.directoryForm.get(controlName)?.touched) return (!this.directoryForm.get(controlName)?.valid && this.directoryForm.get(controlName)?.touched) ? 'is-invalid' : 'is-valid';
    else return '';
  };
};

