import { Component, Inject, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorAddingProductComponent } from '../../features/product/components/dialog-error-adding-product/dialog-error-adding-product.component';
import { ProductService } from '../../features/product/services/product.service';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-snackbar',
  imports: [MatIconModule, MatButtonModule, CommonModule, MatProgressSpinner],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  @Input() icon: string = 'task_alt';
  @Input() hasError: boolean = false;
  @Input() productAdded: boolean = false;
  @Input() message: string = '';
  @Input() product: any | undefined;
  @Input() errorAddingProduct: boolean = false;
  @Input() error: any
  dialog = inject(MatDialog);
  snackBarRef = inject(MatSnackBarRef);  
  @Input() addingProduct: any;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private productService: ProductService, private router: Router) {
    this.icon = data.icon || this.icon;
    this.message = data.message || this.message;
    this.hasError = data.hasError || this.hasError
    this.productAdded = data.productAdded || this.productAdded
    this.product = data.product || this.product
    this.errorAddingProduct = data.errorAddingProduct || this.errorAddingProduct
    this.error = data.error || this.error
    this.addingProduct = data.addingProduct || this.addingProduct
  }

  displayErrorAddingProduct(): void {
    this.dialog.open(DialogErrorAddingProductComponent, {
      data: { error: this.error }
    });
  }

  navigateToProduct(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.productService.setCurrentProduct(this.product)
      this.router.navigate([`products/${this.product._id}`]);
    } else {
      console.error('No token found in localStorage.');
      this.router.navigate(['/login']);
    }
  }

}

