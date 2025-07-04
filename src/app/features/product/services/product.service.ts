import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;
  cache: any
  currentProduct: Product | undefined;
  private productsSubject = new BehaviorSubject<Product[]>([]); // Hold the product list
  products$ = this.productsSubject.asObservable(); // Expose as observable for components

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const formData = new FormData();
    formData.append('category', product.category);
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('image', product.image);
    return this.http.post<any>(this.apiUrl, formData, { headers }).pipe(
      tap((response) => {
        // Update the BehaviorSubject with the new product list
        const currentProducts = this.productsSubject.value; // Get the current product list
        const updatedProducts = [...currentProducts, response.product]; // Add the new product
        this.productsSubject.next(updatedProducts); // Push the updated list
      })
    );
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

  fetchProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((response) => {
        this.productsSubject.next(response.products); // Update the product list
      })
    );
  }

  searchProduct(product: string): Observable<any> {
    if (!this.cache) {
      this.cache = {}; // Initialize the cache if it doesn't exist
    }
    if (this.cache[product]) {
      return of(this.cache[product]); // Return cached data as an Observable
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}?name=${product}`, { headers }).pipe(
      tap((response) => {
        this.cache[product] = response;
      })
    );
  }

  setCurrentProduct(product: Product | undefined) {
    this.currentProduct = product
  }

  clearCache(): void {
    this.productsSubject.next([])
  }
  
  deleteProduct(idProduct: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<any>(`${this.apiUrl}/${idProduct}`, { headers }).pipe(
      tap(() => {
        const updatedProducts = this.productsSubject.value.filter(
          (product) => product._id !== idProduct
        );
        this.clearCache()
        this.productsSubject.next(updatedProducts); // Update the list after deletion
      })
    );
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
  image: string;
  deleted: boolean;
}
