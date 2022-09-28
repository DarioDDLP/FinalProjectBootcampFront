import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  baseUrl: string = 'http://localhost:3000/api/documentation/'

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadDoc(token: any, pForm: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}`, pForm, httpOptions));
  }

  getNotApproved(token: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    };
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}not-approved`, httpOptions));
  }

  getApproved(token: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    };
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}approved`, httpOptions));
  }

  authorization(token: any, id: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    };
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}change-authorization/${id}`, httpOptions));
  }

  delete(token: any, id: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    };
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}delete/${id}`, httpOptions));
  }

  getById(token: any, id: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    };
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${id}`, httpOptions));
  }
}
