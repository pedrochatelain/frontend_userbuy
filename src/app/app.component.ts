import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavBar: boolean = true;

  constructor(private router: Router) {
    // Subscribe to route changes to show/hide the nav-bar
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showNavBar = currentRoute !== '/login'; // Hide nav-bar on login page
    });
  }
}
