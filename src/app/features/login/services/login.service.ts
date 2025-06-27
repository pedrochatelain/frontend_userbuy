import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../components/dialog-logout/dialog-logout.component';
import { ProductService } from '../../product/services/product.service';
import { PurchaseService } from '../../purchases/services/purchase.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogout = `${environment.apiUrl}/api/logout`;
  private urlLogin = `${environment.apiUrl}/api/login`;
  loggingIn = new EventEmitter<boolean>();
  refreshTimer: any;
  password: string | undefined;
  username: string | undefined;

  constructor(
    private http: HttpClient, 
    private dialog: MatDialog, 
    private productService: ProductService, 
    private purchaseService: PurchaseService
  ) {}

  logout(): Observable<any> {
    clearTimeout(this.refreshTimer);
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    this.productService.clearCache();
    this.purchaseService.clearCache();
    return this.http.post<any>(this.urlLogout, {'token': token});
  }

  login(username: string, password: string): Observable<any> {
    this.username = username
    this.password = password
    const data = {
      "username": username,
      "password": password
    }
    return this.http.post<any>(this.urlLogin, data)
  }

  openLogoutDialog() {
    this.dialog.open(DialogLogoutComponent);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.scheduleTokenRefresh(token);
  }

  scheduleTokenRefresh(token: string): void {
    const decodedToken: { exp: number } = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    const timeUntilRefresh = expirationTime - Date.now() - 2 * 60 * 1000; // Refresh 2 minutes before expiration

    if (timeUntilRefresh > 0) {
      this.refreshTimer = setTimeout(() => {
        this.refreshToken();
      }, timeUntilRefresh);
    }
  }

  refreshToken(): void {
    const data = {
      "username": this.username,
      "password": this.password
    }
    this.http.post<any>(this.urlLogin, data).subscribe({
      next: (response) => {
        this.setToken(response.token);
      },
      error: () => {
        this.logout();
      },
    });
  }

}
