// To avoid importing all of observables (large library), we only import the
// operators we need below. This only needs to be done ONCE here.
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent, environment, appRouterProviders } from './app/';
import { AuthService, GlobalStateService } from './app/shared/';


if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  GlobalStateService,
  AuthService
])
.catch((error) => {
  console.log("Bootstrapping Error: ", error);
});
