import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { DialogAddProductComponent } from './dialog-add-product/dialog-add-product.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavBar: boolean = true;
  dialog = inject(MatDialog);

  constructor(private router: Router, private authGuard: AuthGuard) {
    // Subscribe to route changes to show/hide the nav-bar
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showNavBar = currentRoute !== '/login'; // Hide nav-bar on login page
    });
  }

  openDialog() {
    this.dialog.open(DialogAddProductComponent);
  }

  get isAdmin(): boolean {
    return this.authGuard.isAdmin();
  }

}