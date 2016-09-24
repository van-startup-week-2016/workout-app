import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base-service';
import { GlobalStateService } from './global-state.service'; // cannot use barrel -> from '../'
import { user, storageType } from '../../types';


@Injectable()
export class AuthService extends BaseService {

  constructor(httpService: Http, private globalStateService: GlobalStateService) {
    super(httpService);
  }

  /**
   * Logs a user in and returns the user.
   *
   * Updates globalState (localStorage) for `user` and `loggedIn` fields.
   */
  public login(email: string, password: string): Observable<user> {
    return this.http().post('/api/login', { username: email, password })
      .map((response) => {
        const user = this.extractData(response);
        const loggedIn = true;
        this.globalStateService.write({ user, loggedIn }, storageType.LocalStorage);
        return user;
      })
      .catch(this.extractError);
  }

  /**
   * Registers a user and returns the user.
   *
   * Updates globalState (localStorage) for `user` and `loggedIn` fields.
   */
  public register(email: string, password: string): Observable<user> {
    return this.http().post('/api/register', { username: email, password })
      .map((response) => {
        const user = this.extractData(response);
        const loggedIn = true;
        this.globalStateService.write({ user, loggedIn }, storageType.LocalStorage);
        return user;
      })
      .catch(this.extractError);
  }

  /**
   * Logs a user out.
   *
   * Updates globalState (localStorage) for `user` and `loggedIn`.
   */
  public logout() {
    return this.http().get('/api/logout')
      .map((response) => {
        const loggedIn = false;
        this.globalStateService.write({ loggedIn }, storageType.LocalStorage);
        this.globalStateService.remove("user", storageType.LocalStorage);
        return this.extractData(response);
      })
      .catch(this.extractError);
  }

  /**
   * Returns true if a user is logged in, will first check globalState property
   * `loggedIn` (localStorage), and if no information is available will query
   * the API for the user account to figure out if the user is logged in.
   *
   * NOTE: LocalStorage can easily be changed by the user to access pages on the
   * frontend, this is irrelevent as the frontend technically is all given to
   * the user anyway - the point of not allowing them to go to certain pages is
   * simply for the User Experience. The API cannot be breached regardless of
   * values in loclaStorage being changed, and that's what's important.
   */
  public isLoggedIn(): Observable<boolean> {
    if(this.globalStateService.has("loggedIn", storageType.LocalStorage)) {
      return Observable.of(
        this.globalStateService.read("loggedIn", storageType.LocalStorage)
      );
    }

    return this.http().get('/api/account')
      .map((response) => {
        const user = this.extractData(response);
        const loggedIn = true;
        this.globalStateService.write({ user, loggedIn }, storageType.LocalStorage);
        return true;
      })
      .catch((errorResponse) => {
        const loggedIn = false;
        this.globalStateService.write({ loggedIn }, storageType.LocalStorage);
        this.globalStateService.remove("user", storageType.LocalStorage);
        return Observable.of(false);
      });
  }
}
