import {Component, inject, Injectable, Input, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../../shared/snackbar/snackbar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-account-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './create-account-form.component.html',
  styleUrl: './create-account-form.component.css'
})
@Injectable({providedIn: 'root'})
export class CreateAccountFormComponent {
  private http = inject(HttpClient);
  username = ""
  password = ""
  repeat_password = ""
  loading = false;
  loggedIn = false;
  error = null
  private _snackBar = inject(MatSnackBar);
  hidePassword = true
  @Input() disabled = true

  emptyForm(): void {
    this.username = ""
    this.password = ""
    this.repeat_password = ""
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  createAccount(): void {
    if (this.password === this.repeat_password) {
      this.loading = true
      this.error = null
      const data = {
        "username": this.username,
        "password": this.password
      }
      this.http.post<any>('http://192.168.0.149:3000/api/users', data).subscribe({
        next: response => {
          this.username = ""
          this.password = ""
          this.repeat_password = ""
          this.openSnackBar("User created successfully", "Close", false)
        },
        error: error => {
          this.error = error.error.error
          console.error('Errore:', error);
        },
        complete: () => {
          console.log('Request complete');
        }
      });
      this.loading = false
    } else {
      this.openSnackBar("Couldn't create user", "Close", true)
    }
  }

  openSnackBar(message: string, action: string, hasError: boolean) {
    let config = new MatSnackBarConfig();
    config.announcementMessage = message
    config.duration = 3000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'bottom'
    config.panelClass = ['snackbar']
    if (hasError) {
      config.panelClass = ['red-snackbar']
    }
    // this._snackBar.open(message, action, config);
    this._snackBar.openFromComponent(SnackbarComponent, config)
  }

}
