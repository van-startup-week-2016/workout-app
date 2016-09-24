import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CanActivateGuard } from '../../types';
import { AuthService } from '../';


@Injectable()
export class UnauthGuard implements CanActivateGuard {

  constructor(private router: Router, private authService: AuthService) { }

  /**
   * Ensures: User is not authenticated.
   * Redirects: To main page if user authenticated.
   */
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn()
      .map((loggedIn) => {
        if(!loggedIn) {
          return true;
        }

        this.router.navigate(['/main']);
        return false;
      });
  }
}