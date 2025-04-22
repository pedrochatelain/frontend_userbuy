import {Component, inject, Injectable} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

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

  updateUsername(): void {
    console.log(this.username)
  }

  updatePassword(): void {
    console.log(this.password)
  }

  login(): void {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.loggedIn = true
    }, 3000);
    this.http.get<any>('http://localhost:3000/api/products', {observe: 'response'}).subscribe(res => {
      console.log('Response status:', res.status);
      console.log('Body:', res.body);
    });
  }
}
