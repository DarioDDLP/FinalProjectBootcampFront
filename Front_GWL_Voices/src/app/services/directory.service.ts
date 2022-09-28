import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  baseUrl: string = 'http://localhost:3000/api'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllContacts(token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/directory`, httpOptions))
  }

  getById(token: string | any, id: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/directory/${id}`, httpOptions))
  }

  changeStatus(token: string | any, id: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/directory/${id}`, httpOptions))
  }

  newContact(pForm: any, token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/directory/register`, pForm, httpOptions))
  }
}