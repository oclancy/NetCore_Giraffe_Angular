import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      let url: string = state.url;

      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
      if (this.authService.IsLoggedIn) { return true; }

      // Store the attempted URL for redirecting
      this.authService.RedirectUrl = url;

      // Navigate to the login page with extras
      this.router.navigate(['login']);

      return false;
  }
}
