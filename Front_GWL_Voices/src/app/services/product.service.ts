import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'http://localhost:3000/api'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/merchandising`, httpOptions))
  }

  getCategories(token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/merchandising/get-category`, httpOptions))
  }

  createProduct(fd: any, token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/merchandising`, fd, httpOptions))
  }

  changeStatus(id: any, token: string | any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/merchandising/delete/${id}`, httpOptions))
  }

  sendEmail(id: any, token: any, pForm: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/merchandising/enquire/${id}`, pForm, httpOptions))
  }

  getByCategory(token: any, pForm: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "authorization": token
      })
    }
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/merchandising/get-filtered`, pForm, httpOptions))
  }
}
