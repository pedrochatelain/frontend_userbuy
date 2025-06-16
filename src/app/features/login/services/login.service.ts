import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogout = `${environment.apiUrl}/api/logout`;
  private urlLogin = `${environment.apiUrl}/api/login`;

  constructor(private http: HttpClient) {}

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    return this.http.post<any>(this.urlLogout, {'token': token});
  }

  login(username: string, password: string): Observable<any> {
    const data = {
      "username": username,
      "password": password
    }
    return this.http.post<any>(this.urlLogin, data)
  }

}
