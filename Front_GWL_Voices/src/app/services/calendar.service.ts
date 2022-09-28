import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  baseUrl: string = 'http://localhost:3000/api/calendar/'
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllEvents(token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`, httpOptions))
  }

  createEvent(token: any, event: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}`, event, httpOptions))
  }

  deleteEvent(token: any, id: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}delete/${id}`, httpOptions));
  }
}
