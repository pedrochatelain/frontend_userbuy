import {Component, inject, Injectable} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'app-login',
  styleUrl: 'login.component.css',
  templateUrl: 'login.component.html',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
@Injectable({providedIn: 'root'})
export class LoginComponent {
  private http = inject(HttpClient);
  username = ""
  password = ""
  loading = false;
  loggedIn = false;
  error = null

  constructor(private router: Router) {}

  updateUsername(): void {
    console.log(this.username)
  }

  updatePassword(): void {
    console.log(this.password)
  }

  login(): void {
    this.loading = true
    this.error = null
    const data = {
      "username": this.username,
      "password": this.password
    }
    this.http.post<any>('http://192.168.0.149:3000/api/login', data).subscribe({
      next: response => {
        console.log('Success:', response);
        this.router.navigate(['home'])
      },
      error: error => {
        setTimeout(() => this.error = error.error.error, 1000);
        console.error('Errore:', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
    setTimeout(() => this.loading = false, 1000);
  }
}
