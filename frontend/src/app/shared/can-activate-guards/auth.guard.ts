import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CanActivateGuard } from '../../types';
import { AuthService } from '../';


@Injectable()
export class AuthGuard implements CanActivateGuard {

  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Ensures: User is authenticated.
   * Redirects: To welcome page if not authorized.
   */
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn()
      .map((isLoggedIn) => {
        if(isLoggedIn) {
          return true;
        }

        this.router.navigate(['/welcome']);
        return false;
      });
  }
}