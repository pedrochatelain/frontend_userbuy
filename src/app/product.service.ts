import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://192.168.0.149:3000/api/products';

  constructor(private http: HttpClient) {}

  /**
   * Adds a new product to the server.
   * @param product The product details to add.
   * @returns An Observable of the server response.
   */
  addProduct(product: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Set up headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(this.apiUrl, product, { headers });
  }

  uploadProductImage(productId: string, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('token'); // Assuming you're using tokens
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(
      `http://192.168.0.149:3000/api/products/${productId}/images`,
      formData,
      { headers }
    );
  }

}

/**
 * Interface for product details.
 */
export interface Product {
  category: string;
  price: string;
  name: string;
  stock_quantity: string;
  currency: string;
}
