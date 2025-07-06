import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { ProductService } from '../../services/product.service';
import { ScreenService } from '../../../../shared/services/screen.service';

@Component({
  selector: 'app-add-product',
  imports: [
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatIconModule, 
    MatProgressSpinnerModule
],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  image: File | undefined;
  imageName: string = 'Click here to add image';
  previewUrl: string | undefined;
  isBtnDisabled: boolean = false;
  price: any;
  name: any;
  product: any;
  description: any;
  productAdded: boolean = false;
  @ViewChild('productForm') productForm!: NgForm;
  isMobile: boolean = false;


  constructor(
    private viewportScroller: ViewportScroller,
    private snackbarService: SnackbarService,
    private productService: ProductService,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    })
  }


  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.imageName = this.image.name;

      // Generate preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.image);
    }
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.control.markAllAsTouched();
      this.viewportScroller.scrollToPosition([0, 0]);
      return;
    }
    this.snackbarService.displayAddingProduct()
    this.isBtnDisabled = true;
    const product = {
      "price": this.price,
      "name": this.name,
      "description": this.description,
      "image": this.image
    };

    this.productService.addProduct(product).subscribe({
      next: (response) => {
        this.isBtnDisabled = false
        this.product = response.product;
        this.productAdded = true;
        this.snackbarService.displayProductAdded(this.product)
      },
      error: (error) => {
        this.isBtnDisabled = false
        this.snackbarService.displayErrorAddingProduct(error)
      },
    });
  }
}
