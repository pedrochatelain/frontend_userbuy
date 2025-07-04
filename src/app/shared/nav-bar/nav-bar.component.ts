import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ScreenService } from '../services/screen.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../features/login/services/login.service';
import { MatMenuModule } from '@angular/material/menu';
import { decodeToken } from '../../utils/decodeToken';
import { AuthGuard } from '../../auth/auth.guard';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIconModule, MatButtonModule, CommonModule, MatMenuModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  selectedButton: string = 'home';
  isMobile = false

  constructor(
    private router: Router, 
    private screenService: ScreenService, 
    private loginService: LoginService,
    private authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    // Set the initial button based on the current route
    this.updateSelectedButton(this.router.url);

    // Listen to router navigation events for updates
    this.router.events.subscribe(() => {
      this.updateSelectedButton(this.router.url);
    });

    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  private updateSelectedButton(url: string): void {
    if (url.includes('/purchases')) {
      this.selectedButton = 'purchases';
    } else if (url.includes('/home')) {
      this.selectedButton = 'home';
    } 
     else if (url.includes('/wallet')) {
      this.selectedButton = 'wallet';
    } else if (url.includes('/search')) {
      this.selectedButton = 'search';
    } else if (url.includes('/add-product')) {
      this.selectedButton = 'add_product';
    }
    else {
      this.selectedButton = ''; // Default or no selection
    }
  }

  navigateToPurchases(): void {
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use.
    if (token) {
      const decodedToken = decodeToken(token);
      const userId = decodedToken?.id; // Replace 'user_id' with the actual key in the payload.
      if (userId) {
        this.selectedButton = 'purchases'; // Set the selected button.
        this.router.navigate([`purchases/${userId}`]);
      } else {
        console.error('User ID not found in the token.');
      }
    } else {
      console.error('No token found in localStorage.');
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.loginService.openLogoutDialog()
  }  

  navigateToHome(): void {
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use.
    if (token) {
      this.selectedButton = 'home'; // Set the selected button.
      this.router.navigate(['home']);
    } else {
      console.error('No token found in localStorage.');
      this.router.navigate(['/login']);
    }
  }

  navigateToSearch(): void {
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use.
    if (token) {
      this.selectedButton = 'search'; // Set the selected button.
      this.router.navigate(['search']);
    } else {
      console.error('No token found in localStorage.');
      this.router.navigate(['/login']);
    }
  }

  navigateToWallet(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      const userId = decodedToken?.id;
      this.selectedButton = 'wallet';
      this.router.navigate([`wallet/${userId}`]);
    } else {
      console.error('No token found in localStorage.');
      this.router.navigate(['/login']);
    }
  }

  navigateToAddProduct(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      this.selectedButton = 'add_product';
      this.router.navigate(['/add-product']);
    } else {
      console.error('No token found in localStorage.');
      this.router.navigate(['/login']);
    }
  }

  selectButton(button: string): void {
    this.selectedButton = button;
  }

  get isAdmin(): boolean {
    return this.authGuard.isAdmin();
  }

}
