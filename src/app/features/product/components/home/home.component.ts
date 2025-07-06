import { Component, inject, Injectable, OnInit } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component'
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthGuard } from '../../../../auth/auth.guard';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ScreenService } from '../../../../shared/services/screen.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CardProductComponent, CommonModule, MatProgressSpinner],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
@Injectable({providedIn: 'root'})
export class HomeComponent implements OnInit {

  loading = true;
  products: any[] = [];
  dialog = inject(MatDialog);
  isMobile = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private productService: ProductService, private authGuard: AuthGuard, private viewportScroller: ViewportScroller, private screenService: ScreenService) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);

    this.subscriptions.add(
      this.productService.products$.subscribe((products) => {
        this.products = products;
        this.loading = false;
      })
    );

    if (this.products.length === 0) {
      this.loading = true;
      this.subscriptions.add(
        this.productService.fetchProducts().subscribe({
          next: () => this.loading = false,
          error: () => this.loading = false,
        })
      );
    }

    this.subscriptions.add(
      this.screenService.isMobile$.subscribe(isMobile => {
        this.isMobile = isMobile;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  trackById(index: number, product: any): string {
    return product._id;
  }


}
