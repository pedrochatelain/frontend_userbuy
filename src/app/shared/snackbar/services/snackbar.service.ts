import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  displayError(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.data = {
      icon: 'error',
      message: message,
      hasError: true
    };
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }

  displaySuccess(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.data = {
      icon: 'task_alt',
      message: message,
      hasError: false
    };
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }
}
