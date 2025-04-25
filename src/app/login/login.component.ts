import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';
import { MatButtonModule } from '@angular/material/button';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'app-login',
  styleUrl: 'login.component.css',
  templateUrl: 'login.component.html',
  imports: [LoginFormComponent, CreateAccountFormComponent, MatButtonModule],
})
export class LoginComponent {
  showLoginForm = true;
  toggle_forms_text = "I don't have an account"

  toggleForms() {
    this.showLoginForm = !this.showLoginForm;
  }  
}
