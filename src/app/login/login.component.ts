import { Component, ViewChild } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'app-login',
  styleUrl: 'login.component.css',
  templateUrl: 'login.component.html',
  imports: [LoginFormComponent, CreateAccountFormComponent, MatButtonModule, CommonModule],
})
export class LoginComponent {
  showLoginForm = true;
  toggle_forms_text = "I don't have an account"
  isCreateUserHidden: boolean = true;
  @ViewChild(CreateAccountFormComponent) createAccountComponent!: CreateAccountFormComponent;
  
  toggleForms() {
    this.showLoginForm = !this.showLoginForm;
    this.isCreateUserHidden = !this.isCreateUserHidden
    this.createAccountComponent.emptyForm()  
  }  
}
