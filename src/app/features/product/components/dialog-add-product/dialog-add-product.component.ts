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
  uploadingImage = false
  isBtnDisabled = false
  productAdded = false;
  product!: any;
  loading = false
  private productService = inject(ProductService);
  readonly dialogRef = inject(MatDialogRef<DialogAddProductComponent>);
  @ViewChild('dialogContent') dialogContent!: ElementRef;
  isMobile = false;
  image: File | undefined;
  imageName = ''

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
      "image": this.image
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
        this.closeDialog()
        this.snackbarService.displayProductAdded(this.product)
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = error.error.error;
        this.errorName = error.error.issues?.name;
        this.errorCategory = error.error.issues?.category;
        this.btnTitle = 'Add Product';
        this.loading = false;
        this.snackbarService.displayErrorAddingProduct(error)
        this.scrollToError()
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.imageName = this.image.name
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  unfocus(inputStockQuantity: HTMLInputElement): void {
    inputStockQuantity.blur()
  }

}
