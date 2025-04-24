import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  selectedButton: string = 'home';

  constructor(private router: Router) {}

  navigateToPurchases(): void {
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use.
    if (token) {
      const decodedToken = this.decodeToken(token);
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

  selectButton(button: string): void {
    this.selectedButton = button;
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
