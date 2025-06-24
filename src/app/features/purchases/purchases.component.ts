import { Component, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardProductComponent } from '../product/components/card-product/card-product.component'; 
import { CommonModule, ViewportScroller } from '@angular/common';
import { Purchase, PurchaseService } from './services/purchase.service';
import { ScreenService } from '../../shared/services/screen.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-purchases',
  imports: [CardProductComponent, CommonModule, MatProgressSpinner],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
@Injectable({ providedIn: 'root' })
export class PurchasesComponent {
  purchases: Purchase[] = [];
  userId: string | null = null;
  isMobile = false
  loading = false;

  constructor(
    private route: ActivatedRoute, 
    private viewportScroller: ViewportScroller,
    private screenService: ScreenService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.userId = this.route.snapshot.paramMap.get('id_user');
    this.purchases = this.purchaseService.purchases
    if (this.purchases.length == 0) {
      this.loading = true
      this.purchaseService.fetchPurchases(this.userId!).subscribe({
        next: (response) => {
          this.purchases = response
          this.loading = false
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false
        },
        complete: () => {
          this.loading = false
        },
      });
    }

    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  trackByPurchase(index: number, purchase: any): string {
    return purchase._id;
  }

}
