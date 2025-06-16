import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ScreenService } from '../../../../shared/services/screen.service';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';


@Component({
  selector: 'app-dialog-add-product',
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent, 
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatIconModule, 
    MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule
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
  uploadingImage = false
  isBtnDisabled = false
  productAdded = false;
  product!: any;
  loading = false
  private productService = inject(ProductService);
  readonly dialogRef = inject(MatDialogRef<DialogAddProductComponent>);
  @ViewChild('dialogContent') dialogContent!: ElementRef;
  isMobile = false;

  constructor(private cdr: ChangeDetectorRef, private screenService: ScreenService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  scrollToError(): void {
    this.cdr.detectChanges();
    if (this.dialogContent) {
      const element = this.dialogContent.nativeElement;
      element.scrollTop = element.scrollHeight; // Scroll to the bottom
    }
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
        // Emit the added product
        this.productService.productAdded.emit(response.product);
        this.snackbarService.displaySuccess(`${this.name} successfully added`)
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = error.error.error;
        this.errorName = error.error.issues?.name;
        this.errorCategory = error.error.issues?.category;
        this.btnTitle = 'Add Product';
        this.loading = false;
        this.snackbarService.displayErrorAddingProduct("Error adding product", error)
        this.scrollToError()
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadImage(this.product._id, file);
    }
  }

  uploadImage(productId: string, file: File): void {
    this.success = ""
    this.error = ""
    this.uploadingImage = true
    this.productService.uploadProductImage(productId, file).subscribe({
      next: () => {
        this.success = 'Image uploaded successfully!';
        this.uploadingImage = false
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        this.error = 'Failed to upload image.';
        this.uploadingImage = false
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
