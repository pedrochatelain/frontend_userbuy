import { Component } from '@angular/core';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-account',
  imports: [CreateAccountFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  
  constructor(private router: Router){}

  navigateToLoginOptions() {
    this.router.navigate(['login'])
  }
}
