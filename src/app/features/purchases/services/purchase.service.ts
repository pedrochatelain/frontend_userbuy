import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = environment.apiUrl
  purchases: Purchase[] = [];

  constructor(private http: HttpClient) { }

  fetchPurchases(id_user: string): Observable<Purchase[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.get<Purchase[]>(`${this.apiUrl}/api/users/${id_user}/purchases`, { headers }).pipe(
    // Transform the response directly
    map(response =>
      response.map(purchase => ({
        ...purchase,
        purchaseDate: new Date(purchase.purchaseDate), // Ensure Date conversion
      }))
    ),
    tap(transformedResponse => {
      // Store the transformed data in the service for reuse
      this.purchases = transformedResponse;
    })
  );
}


}

export interface Purchase {
  _id: string;
  product: Product;
  purchaseDate: Date
}

interface Product {
  _id: string;
  name: string;
  price: number;
}