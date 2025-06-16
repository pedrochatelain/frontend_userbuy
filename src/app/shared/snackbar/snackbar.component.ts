import { Component, Inject, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorAddingProductComponent } from '../../features/product/components/dialog-error-adding-product/dialog-error-adding-product.component';

@Component({
  selector: 'app-snackbar',
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  @Input() icon: string = 'task_alt';
  @Input() hasError: boolean = false;
  @Input() message: string = '';
  @Input() errorAddingProduct: boolean = false;
  @Input() error: any
  dialog = inject(MatDialog);
  snackBarRef = inject(MatSnackBarRef);  

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.icon = data.icon || this.icon;
    this.message = data.message || this.message;
    this.hasError = data.hasError || this.hasError
    this.errorAddingProduct = data.errorAddingProduct || this.errorAddingProduct
    this.error = data.error || this.error
  }

  displayErrorAddingProduct(): void {
    this.dialog.open(DialogErrorAddingProductComponent, {
      data: { error: this.error }
    });

  }

}

