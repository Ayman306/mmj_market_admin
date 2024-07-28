import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  auth: any = localStorage.getItem('Token');
  headers = {
    Authorization: this.auth ? JSON.parse(this.auth).access_token : '',
  };

  getProducts(params?: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product`, {
      headers: this.headers,
      params,
    });
  }
  loginUser(data: any) {
    return this.http.post<any>(`${this.apiUrl}/user/login`, data);
  }
  resetPassword(data: any) {
    return this.http.post<any>(`${this.apiUrl}/user/reset-password`, data);
  }
}
