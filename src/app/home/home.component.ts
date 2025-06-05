import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import {CardProductComponent} from '../card-product/card-product.component'
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  imports: [CardProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
@Injectable({providedIn: 'root'})
export class HomeComponent implements OnInit {

  private http = inject(HttpClient);
  loading = true;
  products: any[] = [];

  constructor(private productService: ProductService) {}


  ngOnInit(): void {
    this.fetchProducts();

    // Listen for productAdded events
    this.productService.productAdded.subscribe((newProduct) => {
      this.products.push(newProduct); // Add new product to the list
    });

  }

  fetchProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    });
  }

}
