import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { ScreenService } from '../../../../shared/services/screen.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

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
  private apiUrl = environment.apiUrl
  insufficientFunds = false
  isMobile = false;
  isBtnPurchaseDisabled = false
  loadingPage: boolean = false;

  
  constructor(
    private viewportScroller: ViewportScroller, 
    private route: ActivatedRoute,
    private productService: ProductService,
    private screenService: ScreenService,
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private router: Router
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
    this.productService.deleteProduct(idProduct!).subscribe({
      next: (response) => {
        this.snackbarService.displaySuccess(response.message)
      },
      error: (error) => {
        this.snackbarService.displayError(error.error.error)
      }
    });
  }

  purchase(): void {
    this.loading = true
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use.
    if (token) {
      const decodedToken = decodeToken(token);
      const userId = decodedToken?.id; // Replace 'user_id' with the actual key in the payload.
      const data = {
        "idUser": userId,
        "idProduct": this.product._id
      }
      this.http.post<any>(`${this.apiUrl}/api/purchases`, data).subscribe({
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
  }

}
