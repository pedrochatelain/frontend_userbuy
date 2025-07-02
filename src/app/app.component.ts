import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavBar: boolean = true;

  constructor(private router: Router) {
    // Subscribe to route changes to show/hide the nav-bar
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showNavBar = currentRoute !== '/login' && currentRoute !== '/login-with-account' && currentRoute != '/create-account';
    });
  }

}