import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { ScreenService } from '../../../../shared/services/screen.service';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseService } from '../../../purchases/services/purchase.service';
import { AuthGuard } from '../../../../auth/auth.guard';

@Component({
  selector: 'app-product-details',
  imports: [ CommonModule, MatButtonModule, MatProgressSpinner, MatMenuModule, MatIconModule ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  loading = false
  product!: Product;
  isPurchased: boolean = false
  insufficientFunds = false
  isMobile = false;
  isBtnPurchaseDisabled = false
  loadingPage: boolean = false;
  isProductDeleted: boolean = false;
  isDeleting:boolean = false;


  constructor(
    private viewportScroller: ViewportScroller, 
    private route: ActivatedRoute,
    private productService: ProductService,
    private screenService: ScreenService,
    private snackbarService: SnackbarService,
    private purchaseService: PurchaseService,
    private authGuard: AuthGuard,
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.route.paramMap.subscribe(() => {
      const currentProduct = this.productService.currentProduct
      const idProductUrl = this.route.snapshot.paramMap.get('id_product')
      if ( ! currentProduct || currentProduct._id != idProductUrl) {
        this.fetchProduct()
        this.productService.currentProduct = this.product
      }
      this.product = this.productService.currentProduct!
    });
  }


  fetchProduct(): void {
    this.loadingPage = true
    let idProduct = this.route.snapshot.paramMap.get('id_product');
    this.productService.getProduct(idProduct!).subscribe({
      next: (response) => {
        this.product = response.product
        this.isProductDeleted = this.product.deleted
        this.loadingPage = false
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.loadingPage = false
      }
    });
  }

  deleteProduct(): void {
    let idProduct = this.route.snapshot.paramMap.get('id_product');
    this.isDeleting = true
    this.snackbarService.displayDeletingProduct()
    this.productService.deleteProduct(idProduct!).subscribe({
      next: (response) => {
        this.snackbarService.displaySuccess(response.message)
        this.isProductDeleted = true
        this.isDeleting = false
      },
      error: (error) => {
        this.snackbarService.displayError(error.error.error)
        this.isDeleting = false
      }
    });
  }

  purchase(): void {
    this.loading = true
    this.purchaseService.addPurchase(this.product._id).subscribe({
      next: response => {
        this.isPurchased = true
        this.snackbarService.displaySuccess(`You bought ${this.product.name}!`)
        this.loading = false
      },
      error: error => {
        const errorMessage = error.error.error
        this.snackbarService.displayError("Error: " + errorMessage)
        this.loading = false
        if (errorMessage === 'Insufficient funds')
          this.insufficientFunds = true
      },
      complete: () => {
        this.loading = false
      }
    });
  }

  get isAdmin(): boolean {
    return this.authGuard.isAdmin();
  }



}
