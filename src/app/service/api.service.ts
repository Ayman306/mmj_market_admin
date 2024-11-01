import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

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

  loginUser(data: any) {
    return this.http.post<any>(`${this.apiUrl}/user/login`, data);
  }

  addUser(data: any) {
    return this.http.post<any>(`${this.apiUrl}/user/add`, data);
  }
  editUser(data: any) {
    return this.http.post<any>(`${this.apiUrl}/user/update`, data);
  }
  getUser(data?: any) {
    return this.http.post<any>(`${this.apiUrl}/user`, data);
  }

  resetPassword(data: any) {
    return this.http.post<any>(`${this.apiUrl}/user/reset-password`, data);
  }
  getAllJobList(data: any) {
    return this.http.post<any>(`${this.apiUrl}/job`, data);
  }

  getAllJobApprovalList(data: any) {
    return this.http.post<any>(`${this.apiUrl}/job/approval`, data);
  }

  addJob(data: any) {
    return this.http.post<any>(`${this.apiUrl}/job/add`, data);
  }
  editJob(data: any) {
    return this.http.post<any>(`${this.apiUrl}/job/update`, data);
  }



  // ----------------------------------------------------------------

  getCategories(data?: any) {
    return this.http.post<any>(`${this.apiUrl}/category`, data);
  }
}
