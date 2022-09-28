import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersServiceService } from '../services/users-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private router: Router,
    private userSevice: UsersServiceService
  ) { }

  async canActivate(): Promise<any> {
    let token: string | null = localStorage.getItem('token')
    if (token === null) {
      this.router.navigate(['/login'])
      return false;
    } else {
      try {
        await this.userSevice.getUser(token)
      } catch (error: any) {
        this.router.navigate(['/login'])
        await Swal.fire({
          title: 'Info',
          text: 'Session expired',
          icon: 'info',
          confirmButtonText: 'OK'
        });
        return false;
      }
    }
    return true;
  }
}


