import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  baseUrl: string = 'http://localhost:3000/api';

  constructor(
    private Httpclient: HttpClient
  ) { }

  getAll(token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.Httpclient.get<any>(`${this.baseUrl}/messenger`, httpOptions))
  }

  newThread(newThread: any, token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.Httpclient.post<any>(`${this.baseUrl}/messenger`, newThread, httpOptions))
  }

  changeStatus(id: any, token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.Httpclient.get<any>(`${this.baseUrl}/messenger/delete/${id}`, httpOptions))
  }

  getByPostId(token: any, postId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.Httpclient.get<any>(`${this.baseUrl}/messenger/${postId}`, httpOptions));
  }

  newAnswer(token: string | any, newAnswer: any, postId: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.Httpclient.post<any>(`${this.baseUrl}/messenger/new/${postId}`, newAnswer, httpOptions))
  }

  logicDropThreadMessage(token: any, postId: any, id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "authorization": token
      })
    }
    return lastValueFrom(this.Httpclient.get<any>(`${this.baseUrl}/messenger/${postId}/${id}`, httpOptions));
  }
}
