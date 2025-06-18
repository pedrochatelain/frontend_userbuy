import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;
  productAdded = new EventEmitter<any>();
  cache: any
  currentProduct: Product | undefined;

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

    const formData = new FormData();

    formData.append('category', product.category);
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('stock_quantity', product.stock_quantity);
    formData.append('image', product.image);

    return this.http.post<any>(this.apiUrl, formData, { headers });
  }

  getProduct(id_product: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/${id_product}`, { headers });
  }

  uploadProductImage(productId: string, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('token'); // Assuming you're using tokens
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(
      `${this.apiUrl}/${productId}/images`,
      formData,
      { headers }
    );
  }

  getProducts(): Observable<any> {
    if (this.cache) {
      return of(this.cache); // Wrap the cached data in an Observable
    }
    return this.http.get<any>(this.apiUrl).pipe(
      tap(data => this.cache = data) // Cache the data
    );
  }

  searchProduct(product: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}?name=${product}`, { headers });
  }

  setCurrentProduct(product: Product) {
    this.currentProduct = product
  }

}

/**
 * Interface for product details.
 */
export interface Product {
  _id: string;
  category: string;
  price: string;
  name: string;
  stock_quantity: string;
  image: string;
}
