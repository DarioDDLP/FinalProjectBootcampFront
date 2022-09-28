import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailsServiceService {

  baseUrl: string = 'http://localhost:3000/api/send-email'

  constructor(
    private httpClient: HttpClient
  ) { }

  sendEmail(pForm: any, token: any, idReceiver: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/${idReceiver}`, pForm, httpOptions));
  }

  sendEmailTo(pForm: any, token: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/`, pForm, httpOptions));
  }
}



