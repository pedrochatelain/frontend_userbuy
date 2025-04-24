import {Component, inject, Injectable, OnInit} from '@angular/core';
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
export class LoginComponent implements OnInit {
  private http = inject(HttpClient);
  username = ""
  password = ""
  loading = false;
  loggedIn = false;
  error = null

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.username = ""
    this.password = ""
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
