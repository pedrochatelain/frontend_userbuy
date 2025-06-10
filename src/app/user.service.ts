import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  depositAdded = new EventEmitter<any>();
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getBalances(id_user: string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Set up headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/api/users/${id_user}/balances`, {headers});
  }

  depositMoney(id_user: string, money: number) {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Set up headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch<any>(`${this.apiUrl}/api/users/${id_user}/balances`, {amount: money}, {headers});
  }

}
