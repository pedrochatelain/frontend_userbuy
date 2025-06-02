import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardProductComponent } from '../card-product/card-product.component';
import { CommonModule, ViewportScroller } from '@angular/common';

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
  private lastRenderedDate: string | null = null;

  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key used to store your token
    this.viewportScroller.scrollToPosition([0, 0]);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    this.userId = this.route.snapshot.paramMap.get('id_user');
    this.http.get<Purchase[]>(`http://192.168.0.149:3000/api/users/${this.userId}/purchases`, { headers }).subscribe({
      next: (response) => {
        this.purchases = response.map(purchase => ({
          ...purchase,
          purchaseDate: new Date(purchase.purchaseDate), // Convert string to Date
        }));      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request complete');
      },
    });
  }

  isNewDate(date: Date): boolean {
    const formattedDate = date.toDateString(); // Ensure the parameter is a Date
    if (formattedDate !== this.lastRenderedDate) {
      this.lastRenderedDate = formattedDate;
      return true;
    }
    return false;
  }  

  trackByPurchase(index: number, purchase: any): string {
    return purchase._id;
  }

  trackByProduct(index: number, product: any): string {
    return product._id;
  }


}



interface Purchase {
  _id: string;
  product: Product;
  purchaseDate: Date
}

interface Product {
  _id: string;
  name: string;
  price: number;
}