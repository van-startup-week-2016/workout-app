import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { errorCodes } from '../types';
import { AuthService } from '../shared';


// Placeholder defaults (when no error).
const EMAIL_PLACEHOLDER = "email";
const PASSWORD_PLACEHOLDER = "password";
const CONFIRM_PASSWORD_PLACEHOLDER = "confirm password";

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // The model
  private email: string;
  private password: string;
  private confirmPassword: string;

  // The placeholders, change during errors.
  private loginEmailPlaceholder: string;
  private loginPasswordPlaceholder: string;
  private registerEmailPlaceholder: string;
  private registerPasswordPlaceholder: string;
  private registerConfirmPasswordPlaceholder: string;

  // True if there is an error in that input.
  private loginEmailError: boolean;
  private loginPasswordError: boolean;
  private registerEmailError: boolean;
  private registerPasswordError: boolean;
  private registerConfirmPasswordError: boolean;

  // Which view to display.
  private registerView = false;
  private loginView = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.resetPlaceholders();
  }

  /**
   * Resets the placeholders.
   */
  private resetPlaceholders() {
    this.loginEmailPlaceholder = EMAIL_PLACEHOLDER;
    this.loginPasswordPlaceholder = PASSWORD_PLACEHOLDER;
    this.registerEmailPlaceholder = EMAIL_PLACEHOLDER;
    this.registerPasswordPlaceholder = PASSWORD_PLACEHOLDER;
    this.registerConfirmPasswordPlaceholder = CONFIRM_PASSWORD_PLACEHOLDER;

    this.loginEmailError = false;
    this.loginPasswordError = false;
    this.registerEmailError = false;
    this.registerPasswordError = false;
    this.registerConfirmPasswordError = false;
  }

  /**
   * Switches the view and resets errors.
   *
   * @param viewToDisplay Must be one of: ["register", "login"]
   */
  private switchView(viewToDisplay: string) {
    this.resetPlaceholders();

    switch(viewToDisplay) {
      case "register":
        this.registerView = true;
        this.loginView = false;
        break;
      case "login":
        this.registerView = false;
        this.loginView = true;
        break;
    }
  }

  /**
   * Logs a user in or sets the placeholders based on the error code.
   */
  private onLoginSubmit() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (user) => {
          this.router.navigate(['main']);
        },
        (error) => {
          this.setErrorPlaceholder(error.errorCode);
        }
      );
  }

  /**
   * Signs a user up or sets the placeholders based on the error code.
   */
  private onRegisterSubmit() {
    // Check password match on the frontend.
    if(this.password != this.confirmPassword) {
      this.setErrorPlaceholder(errorCodes.passwordDoesNotMatchConfirmPassword);
      return;
    }

    this.authService.register(this.email, this.password)
      .subscribe(
        (user) => {
          this.router.navigate(['main']);
        },
        (error) => {
          this.setErrorPlaceholder(error.errorCode);
        }
      );
  }

  /**
   * Sets certain placeholders to their error messages based on the errorCode.
   */
  private setErrorPlaceholder(errorCode: errorCodes) {

    /**
     * For each errorCode, we have the respective state that must be updated.
     */
    const errorStateUpdate = {
      [errorCodes.emailAddressAlreadyRegistered]: {
        registerEmailPlaceholder: "email already registered",
        registerEmailError: true,
        email: ""
      },
      [errorCodes.incorrectPasswordForEmail]: {
        loginPasswordPlaceholder: "invalid password",
        loginPasswordError: true,
        password: ""
      },
      [errorCodes.invalidEmail]: {
        registerEmailPlaceholder: "invalid email",
        registerEmailError: true,
        email: ""
      },
      [errorCodes.invalidPassword]: {
        registerPasswordPlaceholder: "password too weak",
        registerConfirmPasswordPlaceholder: "password too weak",
        registerPasswordError: true,
        registerConfirmPasswordError: true,
        password: "",
        confirmPassword: ""
      },
      [errorCodes.noAccountExistsForEmail]: {
        loginEmailPlaceholder: "unregistered email",
        loginEmailError: true,
        email: ""
      },
      [errorCodes.passwordDoesNotMatchConfirmPassword]: {
        registerConfirmPasswordPlaceholder: "passwords don't match",
        registerPasswordPlaceholder: "passwords don't match",
        registerConfirmPasswordError: true,
        registerPasswordError: true,
        password: "",
        confirmPassword: ""
      }
    }

    // We want to get rid of previous errors first so there is only one error
    // being displayed at a time, then we update the current state to match
    // the new error state.
    this.resetPlaceholders();
    Object.assign(this, errorStateUpdate[errorCode]);
  }
}
