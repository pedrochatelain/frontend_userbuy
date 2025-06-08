import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product, ProductService } from '../../services/product.service';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-search',
  imports: [ MatInputModule, FormsModule, MatProgressSpinnerModule, CommonModule, CardProductComponent ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  inputProductName=""
  timeout: any
  loading = false
  products: Product[] = []
  noProductsFound = false;

  constructor(private productService: ProductService) {}

  searchProduct(product: string): void {
    if (!product || product.trim() === "") {
      return
    }
    this.products = []
    this.noProductsFound = false
    this.inputProductName = product
    this.loading = true
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.productService.searchProduct(product).subscribe({
      next: (response) => {
        this.products = response.products
        this.products.length == 0 ? this.noProductsFound = true : this.noProductsFound = false
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        
      },
    });
      this.loading = false
    }, 1000);
  }

}
