import { Component, inject, Injectable, OnInit } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component'
import { ProductService } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';
import { AuthGuard } from '../../../../auth/auth.guard';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, CardProductComponent, CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
@Injectable({providedIn: 'root'})
export class HomeComponent implements OnInit {

  loading = true;
  products: any[] = [];
  dialog = inject(MatDialog);

  constructor(private productService: ProductService, private authGuard: AuthGuard, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
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

  openDialog() {
    this.dialog.open(DialogAddProductComponent);
  }

  get isAdmin(): boolean {
    return this.authGuard.isAdmin();
  }

}
