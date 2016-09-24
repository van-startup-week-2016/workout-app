/// Module for all typings specific to the app.

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

/**
 * A basic user.
 */
export interface user {
  email: string;
  password?: string;
}

/**
 * Basic helper interface for assuring a class can be used by `canActivate`.
 */
export interface CanActivateGuard {
  canActivate: () => boolean | Observable<boolean>;
}

/**
 * The `globalStateService` supports 3 different storage types.
 */
export enum storageType {
  LocalStorage,
  SessionStorage,
  InMemoryStorage
}

/**
 * An observable continer where each `value` is an observable for `key`.
 */
export interface observableContainer {
  [key: string]: Subject<any>
}

/**
 * All errorCodes for simpler programmatic communication between the client and
 * server.
 *
 * NOTE An identical enum should be kept on the frontend/backend.
 */
export enum errorCodes {
  youAreUnauthorized = 1,
  emailAddressAlreadyRegistered,
  noAccountExistsForEmail,
  incorrectPasswordForEmail,
  phoneNumberAlreadyTaken,
  invalidMongoID,
  invalidEmail,
  invalidPassword,
  modelHasInvalidTypeStructure,     // This implies that the API was queried direclty with an incorrectly formed object.
  internalError,                    // For errors that are not handleable
  modelUnionTypeHasMultipleErrors,
  passwordDoesNotMatchConfirmPassword
}