import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  token: any;

  constructor(
    private usersService: UsersServiceService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem('token');
    this.user = await this.usersService.getUser(this.token);
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }
}
