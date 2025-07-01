import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar.component';
import { ScreenService } from '../../services/screen.service';
import { Product } from '../../../features/product/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar, private screenService: ScreenService) {}
  
  displayError(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.data = {
      icon: 'error',
      message: message,
      hasError: true
    };
    if (this.screenService.isMobile()) {
      config.verticalPosition = 'top'
    }
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }
  
  displaySuccess(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.data = {
      icon: 'task_alt',
      message: message,
      hasError: false
    };
    if (this.screenService.isMobile()) {
      config.verticalPosition = 'top'
    }
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }
  
  displayProductAdded(product: Product) {
    const message = 'Product added successfully'
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.data = {
      icon: 'task_alt',
      message: message,
      productAdded: true,
      product: product
    };
    if (this.screenService.isMobile()) {
      config.verticalPosition = 'top'
    }
    this.snackBar.openFromComponent(SnackbarComponent, config);

  }

  displayErrorAddingProduct(error: any): void {
    const message = "Error adding product"
    const config = new MatSnackBarConfig();
    config.data = {
      icon: 'error',
      message: message,
      hasError: true,
      errorAddingProduct: true,
      error: error
    }
    if (this.screenService.isMobile()) {
      config.verticalPosition = 'top'
    }
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }

  displayAddingProduct(): void {
    const message = "Adding product"
    const config = new MatSnackBarConfig();
    config.data = {
      message: message,
      addingProduct: true
    }
    if (this.screenService.isMobile()) {
      config.verticalPosition = 'top'
    }
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }

  displayDeletingProduct() {
    const message = "Deleting product"
    const config = new MatSnackBarConfig();
    config.data = {
      message: message,
      addingProduct: true
    }
    if (this.screenService.isMobile()) {
      config.verticalPosition = 'top'
    }
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }

}
