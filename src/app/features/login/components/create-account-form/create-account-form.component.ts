import {Component, inject, Injectable, Input, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../../../shared/services/screen.service';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-account-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule, MatProgressSpinner],
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
  error = ""
  hidePassword = true
  @Input() disabled = true
  private apiUrl = environment.apiUrl
  isMobile = false

  constructor(private screenService: ScreenService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.username = ""
    this.password = ""
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

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
      this.error = ""
      const data = {
        "username": this.username,
        "password": this.password
      }
      this.http.post<any>(`${this.apiUrl}/api/users`, data).subscribe({
        next: response => {
          this.username = ""
          this.password = ""
          this.repeat_password = ""
          this.snackbarService.displaySuccess("User created successfully")
          this.loading = false
        },
        error: error => {
          this.error = error.error.error
          this.snackbarService.displayError(this.error)
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      });
    } else {
        this.snackbarService.displayError("Passwords don't match")
    }
  }

  onEnter(input: HTMLInputElement) {
    input.blur(); // Remove focus to hide the keyboard
  }

}
