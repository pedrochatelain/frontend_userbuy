import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import {CardProductComponent} from '../card-product/card-product.component'
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CardProductComponent, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
@Injectable({providedIn: 'root'})
export class HomeComponent implements OnInit {

  private http = inject(HttpClient);
  loading = true;
  products: any[] = [];

  constructor(private router: Router) {}

  navigateToPurchases(): void {
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use.
    if (token) {
      const decodedToken = this.decodeToken(token);
      const userId = decodedToken?.id; // Replace 'user_id' with the actual key in the payload.
      if (userId) {
        this.router.navigate([`purchases/${userId}`]);
      } else {
        console.error('User ID not found in the token.');
      }
    } else {
      console.error('No token found in localStorage.');
      this.router.navigate(['/login']);
    }
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  ngOnInit(): void {
    this.http.get<any>('http://192.168.0.149:3000/api/products').subscribe({
      next: response => {
        setTimeout(() => {
          this.loading = false
          this.products = response
          console.log('Success:', response);
          
        }, 2000);
      },
      error: error => {
        console.error('Errore:', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

}
