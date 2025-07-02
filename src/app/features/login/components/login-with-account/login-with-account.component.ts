import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-with-account',
  imports: [LoginFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './login-with-account.component.html',
  styleUrl: './login-with-account.component.css'
})
export class LoginWithAccountComponent {

  constructor(private router: Router){}

  navigateToLoginOptions() {
    this.router.navigate(['login'])
  }
}
