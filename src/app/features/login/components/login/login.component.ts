import { Component, ViewChild } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../../../shared/services/screen.service';
import { LoginService } from '../../services/login.service';

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
  isMobile = false;
  loggingIn: boolean = false;
  
  constructor(private screenService: ScreenService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.loginService.loggingIn.subscribe((value) => this.loggingIn = value)
  }

  toggleForms() {
    this.showLoginForm = !this.showLoginForm;
    this.isCreateUserHidden = !this.isCreateUserHidden
    this.createAccountComponent.emptyForm()  
  }  
}
