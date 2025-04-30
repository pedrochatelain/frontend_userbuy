import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardProductComponent } from '../card-product/card-product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchases',
  imports: [CardProductComponent, CommonModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
@Injectable({ providedIn: 'root' })
export class PurchasesComponent {
  private http = inject(HttpClient);
  purchases: Purchase[] = []; // Updated to an array
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key used to store your token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    this.userId = this.route.snapshot.paramMap.get('id_user');
    this.http.get<Purchase[]>(`http://192.168.0.149:3000/api/purchases/${this.userId}`, { headers }).subscribe({
      next: (response) => {
        this.purchases = response;
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request complete');
      },
    });
  }
}


interface Purchase {
  _id: string;
  products: Product[];
  purchaseDate: Date
}

interface Product {
  _id: string;
  name: string;
  price: number;
}