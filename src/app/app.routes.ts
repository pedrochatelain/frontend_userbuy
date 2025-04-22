import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to login
    { path: 'login', component: LoginComponent },         // Login route  
    { path: 'home', component: HomeComponent },
];
