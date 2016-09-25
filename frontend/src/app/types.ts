/// Module for all typings specific to the app.

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';


/**
 * A mongo ID is a string.
 */
type mongoID = string;


/**
 * A `user`.
 *
 * TABLE
 */
export interface user {
  _id?: mongoID;
  email: string;
  password?: string;
  phone?: string;
  friends?: mongoID[]; //default is empty list
  pictureURL?: string;
  badges?: mongoID[];
  workouts?: workout[];
  preferences?: preferences;
  totalPoints?: number; // starts at 0
  currentWorkout?: workout;
}

/**
 * A single workout the user has done.
 */
export interface workout {
  date: Date;
  exerciseID: string;
  numberOfReps: number;
  completed: boolean;
}

/**
 * The workout for the frontend, ID swapped with exercise.
 */
export interface workoutForFrontend {
  date: Date;
  exercise: exercise;
  numberOfReps: number;
  completed: boolean;
}

/**
 * An exercise can be 1/multiple types.
 */
export enum exerciseType {
  upperBody = 1,
  lowerBody,
  core
}

/**
 * User preferences
 */
export interface preferences {
  minutesBeforeAnotherWorkout: number;
  exercises: {
    uniqueKey: string;
    repNumber: number;
  }[];

  // TODO: add time preferences
}

/**
 * An exercise.
 *
 * Not in the DB, stored statically in module `exercise`.
 */
export interface exercise {
  name: string; //e.g. "pushup"
  buildText: (numberOfReps: number) => string; // eg. functions returns "Do <numberOfReps> pushups"
  howToLink: string; // links to website explaining exercise form
  types: exerciseType[];
  insanelyHard: boolean;
}

/**
 * A hash of exercises.
 */
export interface exerciseHash {
  [uniqueKey: string]: exercise
};

/**
 * A badge that a user is in the progress of earning.
 *
 * TABLE
 */
export interface badge {
  _id?: mongoID;
  pictureURL: string;
  name: string;
  description: string;
  // requirement: TODO (frontend must be able to calculate if requirement is met)
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