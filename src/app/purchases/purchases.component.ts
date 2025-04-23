import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-purchases',
  imports: [CardProductComponent],
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
        setTimeout(() => {
          this.purchases = response;
          console.log('Success:', response);
        }, 2000);
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
}

interface Product {
  _id: string;
  name: string;
  price: number;
}