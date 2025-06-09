import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product, ProductService } from '../../services/product.service';
import { CardProductComponent } from '../card-product/card-product.component';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ MatInputModule, FormsModule, MatProgressSpinnerModule, CommonModule, CardProductComponent ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  inputProductName=""
  loading = false
  products: Product[] = []
  noProductsFound = false;
  private searchSubject = new Subject<string>();

  constructor(private productService: ProductService, private viewportScroller: ViewportScroller, private renderer: Renderer2) {
    // Subscribe to searchSubject to handle debounced and switched search requests
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the last input
        switchMap((productName) => {
          if (!productName || productName.trim() === '') {
            this.resetResults();
            return of(null); // Return a null observable to reset results
          }

          this.loading = true;
          return this.productService.searchProduct(productName).pipe(
            catchError((error) => {
              console.error('Error searching products:', error);
              this.resetResults();
              return of(null); // Return a null observable on error
            })
          );
        })
      )
      .subscribe((response: any) => {
        this.loading = false;
        if (response && response.products) {
          this.products = response.products;
          this.noProductsFound = this.products.length === 0;
        }
      });
  }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngAfterViewInit(): void {
    const inputElement = this.renderer.selectRootElement('input[matInput]');
    inputElement.focus();
  }

  searchProduct(product: string): void {
    this.searchSubject.next(product);
  }

  private resetResults(): void {
    this.products = [];
    this.noProductsFound = false;
    this.loading = false;
  }
}
