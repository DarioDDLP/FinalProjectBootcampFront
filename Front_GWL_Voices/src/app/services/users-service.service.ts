import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  baseUrl: string = 'http://localhost:3000/api'

  constructor(
    private httpClient: HttpClient
  ) { }

  login(pForm: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/login`, pForm))
  }

  registerUser(token: any, pForm: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/register`, pForm, httpOptions));
  }

  updateUser(pForm: any, token: any, id: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/member/${id}`, pForm, httpOptions));
  }

  getById(id: number | any, token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/member/${id}`, httpOptions));
  }

  getUser(token: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    };
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/member/user`, httpOptions))
  }

  updatePassword(token: string | any, newPassword: string): Promise<any> {
    const password = {
      newpassword: newPassword
    }
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/member/new-password`, password, httpOptions))
  }

  getAll(token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/member`, httpOptions))
  }

  getAdmins(token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/member/admins`, httpOptions))
  }

  forgotPassword(pForm: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/forgot-password/recovery`, pForm))
  }

  comparePass(token: string | any, user: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/member/oldpassword`, user, httpOptions))
  }

  newPassword(pForm: string | any, resettoken: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "resettoken": resettoken
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/new-password`, pForm, httpOptions));
  }

  changeStatus(user: any, token: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/member/status`, user, httpOptions));
  }

  getAllByStatus(status: any, token: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/member/status-filtered`, status, httpOptions));
  }
}
