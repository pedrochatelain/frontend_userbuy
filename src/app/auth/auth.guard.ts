import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        // Check if the token is still valid
        if (Date.now() / 1000 < decoded.exp) {
          // Check if route has `id_user` parameter and validate it, if applicable
          if (!route.params['id_user'] || decoded.id === route.params['id_user']) {
            return true;
          }
        }
      } catch (e) {
        console.error('Invalid token:', e);
      }
    }

    // If no valid token, navigate to login
    this.router.navigate(['login']);
    return false;
  }
}
