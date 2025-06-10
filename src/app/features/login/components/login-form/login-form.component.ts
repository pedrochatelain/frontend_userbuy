import {Component, inject, Injectable, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../../environments/environment.production';

@Component({
  selector: 'app-login-form',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
@Injectable({providedIn: 'root'})
export class LoginFormComponent implements OnInit {
  private http = inject(HttpClient);
  username = ""
  password = ""
  loading = false;
  loggedIn = false;
  error = null
  hidePassword = true
  private apiUrl = environment.apiUrl

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.username = ""
    this.password = ""
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    this.loading = true
    this.error = null
    const data = {
      "username": this.username,
      "password": this.password
    }
    this.http.post<any>(`${this.apiUrl}/api/login`, data).subscribe({
      next: response => {
        console.log('Success:', response);
        this.router.navigate(['home'])
        localStorage.setItem('token', response.token);
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
  }
}
