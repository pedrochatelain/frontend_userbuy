import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ProductService, Product } from '../product.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-add-product',
  imports: [
    MatDialogTitle,
    MatDialogContent, 
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatIconModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.css'
})
export class DialogAddProductComponent {
data = inject(MAT_DIALOG_DATA);
  name = ""
  category = ""
  stock = ""
  currency = ""
  price = ""
  btnTitle = "Add Product"
  error = ""
  errorName = ""
  errorCategory = ""
  success = ""
  isBtnDisabled = false
  productAdded = false;
  product!: Product;
  loading = false
stockError = '';
  private productService = inject(ProductService);

validateStock() {
  const stockValue = this.stock; // Get the current stock value as a string

  // Check if the stock is empty
  if (!stockValue) {
    this.stockError = 'Stock is required';
    return;
  }

  // Check if the stock is a positive integer using a regular expression
  const positiveIntegerPattern = /^[1-9]\d*$/;
  if (!positiveIntegerPattern.test(stockValue)) {
    this.stockError = 'Stock must be a positive integer';
    return;
  }

  // Clear the error if the input is valid
  this.stockError = '';
}


  addProduct(): void {
    this.loading = true
    this.error = ""
    this.errorName = ""
    this.errorCategory = ""
    const product = {
      "category": this.category,
      "price": this.price,
      "name": this.name,
      "stock_quantity": this.stock,
      "currency": this.currency
    };
    this.productAdded = false

    this.productService.addProduct(product).subscribe({
      next: (response) => {
        this.product = response.product;
        this.productAdded = true;
        this.success = 'Product added successfully';
        this.btnTitle = 'Add Product';
        this.isBtnDisabled = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = error.error.error;
        this.errorName = error.error.issues?.name;
        this.errorCategory = error.error.issues?.category;
        this.btnTitle = 'Add Product';
        this.loading = false;
      },
    });
  }
}
