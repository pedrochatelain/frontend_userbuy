import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import {CardProductComponent} from '../card-product/card-product.component'

@Component({
  selector: 'app-home',
  imports: [CardProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
@Injectable({providedIn: 'root'})
export class HomeComponent implements OnInit {

  private http = inject(HttpClient);
  loading = true;
  products: any[] = [];

  ngOnInit(): void {
    this.http.get<any>('http://192.168.0.149:3000/api/products').subscribe({
      next: response => {
        setTimeout(() => {
          this.loading = false
          this.products = response
          console.log('Success:', response);
          
        }, 2000);
      },
      error: error => {
        console.error('Errore:', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

}
