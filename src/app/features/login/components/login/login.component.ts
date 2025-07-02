import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../../../shared/services/screen.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'app-login',
  styleUrl: 'login.component.css',
  templateUrl: 'login.component.html',
  imports: [MatButtonModule, CommonModule, MatProgressSpinner],
})
export class LoginComponent {
  isMobile = false;
  loggingIn: boolean = false;
  
  constructor(
    private screenService: ScreenService,
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.loginService.loggingIn.subscribe((value) => this.loggingIn = value)
  }


  navigateToLoginWithMyAccount() {
    this.router.navigate(['login-with-account'])
  }

  navigateToCreateAccount() {
    this.router.navigate(['create-account'])
  }

  loginAsAdmin() {
    this.loggingIn = true
    this.loginService.loggingIn.emit(true)
    this.loginService.login("admin", "admin").subscribe({
      next: response => {
        this.router.navigate(['home'])
        this.loginService.setToken(response.token)
        this.loggingIn = false
        this.loginService.loggingIn.emit(false)
        this.snackbarService.displaySuccess("Login successful")
      },
      error: error => {
        const messageError = error.error.error
        this.loggingIn = false
        this.snackbarService.displayError(messageError)
        this.loginService.loggingIn.emit(false)
      },
      complete: () => {
        this.loggingIn = false
        this.loginService.loggingIn.emit(false)
      }
    });
  }

}
