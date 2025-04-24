import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'app-login',
  styleUrl: 'login.component.css',
  templateUrl: 'login.component.html',
  imports: [LoginFormComponent],
})
export class LoginComponent {
  
}
