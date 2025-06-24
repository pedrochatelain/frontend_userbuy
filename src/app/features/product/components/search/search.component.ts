import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product, ProductService } from '../../services/product.service';
import { CardProductComponent } from '../card-product/card-product.component';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScreenService } from '../../../../shared/services/screen.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ MatInputModule, FormsModule, MatProgressSpinnerModule, CommonModule, CardProductComponent, MatIconModule, MatButtonModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  inputProductName=""
  loading = false
  products: Product[] = []
  noProductsFound = false;
  private searchSubject = new Subject<string>();
  isMobile = false
  numberOfProducts = ''

  constructor(
    private productService: ProductService,
    private viewportScroller: ViewportScroller,
    private renderer: Renderer2,
    private screenService: ScreenService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Subscribe to searchSubject to handle debounced and switched search requests
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the last input
        switchMap((productName) => {
          if (!productName || productName.trim() === '') {
            this.resetResults();
            return of(null); // Return a null observable to reset results
          }

          this.loading = true;
          return this.productService.searchProduct(productName).pipe(
            catchError((error) => {
              console.error('Error searching products:', error);
              this.resetResults();
              return of(null); // Return a null observable on error
            })
          );
        })
      )
      .subscribe((response: any) => {
        this.loading = false;
        if (response && response.products) {
          this.products = response.products;
          this.numberOfProducts = response.numberOfProducts
          console.log(this.numberOfProducts)
          this.noProductsFound = this.products.length === 0;
        }
      });
  }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);

    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    // Read search term from route params
    this.route.params.subscribe(params => {
      const searchTerm = params['term'];
      if (searchTerm) {
        this.inputProductName = searchTerm;

        // Check if the term exists in the cache
        const cachedResult = this.productService['cache'][searchTerm];
        if (cachedResult) {
          this.products = cachedResult.products;
          this.numberOfProducts = cachedResult.numberOfProducts;
          this.noProductsFound = this.products.length === 0;
        } else {
          this.searchSubject.next(searchTerm); // Trigger a new search
        }
      }
    });
  }

  searchProduct(product: string): void {
    this.numberOfProducts = '';
    this.products = [];
    this.searchSubject.next(product);

    // Update the URL without triggering navigation
    if (product) {
      history.replaceState(null, '', `/search/${product}`);
    } else {
      history.replaceState(null, '', '/search');
    }
  }

  ngAfterViewInit(): void {
    const inputElement = this.renderer.selectRootElement('input[matInput]');
    if ( ! this.inputProductName)
      inputElement.focus();
  }


  resetResults(): void {
    this.inputProductName = ""
    this.products = [];
    this.noProductsFound = false;
    this.loading = false;
    this.numberOfProducts = '';

    // Reset the URL
    this.router.navigate(['/search']);
  }

  onEnter(input: HTMLInputElement) {
    input.blur(); // Remove focus to hide the keyboard
  }

}
