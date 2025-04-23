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

        // Ensure token is valid and user matches route parameter
        if (Date.now() / 1000 < decoded.exp && decoded.id === route.params['id_user']) {
          return true;
        }
      } catch (e) {
        console.error('Invalid token:', e);
      }
    }

    this.router.navigate(['login']);
    return false;
  }
}
