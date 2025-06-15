import { Component, inject, Injectable, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ScreenService } from '../../../../shared/services/screen.service';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';

@Component({
  selector: 'app-card-product',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, CommonModule, MatProgressSpinner],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
@Injectable({providedIn: 'root'})
export class CardProductComponent {
  @Input() product!: any
  @Input() isBtnPurchaseDisabled: boolean = false
  private http = inject(HttpClient);
  isPurchased: boolean = false
  private apiUrl = environment.apiUrl
  loading = false
  isMobile = false;
  insufficientFunds = false

  constructor(private screenService: ScreenService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  purchase(): void {
    this.loading = true
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use.
    if (token) {
      const decodedToken = this.decodeToken(token);
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

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

}
