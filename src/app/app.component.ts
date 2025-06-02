import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavBar: boolean = true;
  dialog = inject(MatDialog);

  constructor(private router: Router) {
    // Subscribe to route changes to show/hide the nav-bar
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showNavBar = currentRoute !== '/login'; // Hide nav-bar on login page
    });
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda',
      },
    });
  }

}

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.html',
  styleUrl: './dialog-data-example-dialog.css',
  imports: [MatDialogTitle, MatDialogContent, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule],
})
export class DialogDataExampleDialog {
  data = inject(MAT_DIALOG_DATA);
  name = ""
  category = ""
  stock = ""
  currency = ""
  price = ""
  private http = inject(HttpClient);

  addProduct(): void {
  const product = {
    "category": this.category,
    "price": this.price,
    "name": this.name,
    "stock_quantity": this.stock,
    "currency": this.currency
  };

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  // Set up headers with the token
  const headers = { 
    'Authorization': `Bearer ${token}` 
  };

  // Make the HTTP POST request with headers
  this.http.post<any>('http://192.168.0.149:3000/api/products', product, { headers }).subscribe({
    next: response => {
      // this.openSnackBar("User created successfully", "Close", false)
      console.log(response);
    },
    error: error => {
      console.error('Error:', error);
    },
    complete: () => {
      console.log('Request complete');
    }
  });
}

}
