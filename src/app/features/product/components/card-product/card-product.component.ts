import { Component, Injectable, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../../../shared/services/screen.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-card-product',
  imports: [MatCardModule, MatChipsModule, CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
@Injectable({providedIn: 'root'})
export class CardProductComponent {
  @Input() product!: any
  @Input() isPurchase: boolean = false
  loading = false
  isMobile = false;

  constructor(
    private screenService: ScreenService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  navigateToProduct(): void {
    if (this.isPurchase)
      this.productService.setCurrentProduct(undefined)
    else
      this.productService.setCurrentProduct(this.product)      
    this.router.navigate([`products/${this.product._id}`]);
  }

}
