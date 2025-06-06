import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) {}

  getBalances(id_user: string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Set up headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`http://192.168.0.149:3000/api/users/${id_user}/balances`, {headers});
  }

}
