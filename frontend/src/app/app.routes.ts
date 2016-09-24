import { provideRouter, RouterConfig } from '@angular/router';

import { MainComponent } from './main/';
import { WelcomeComponent } from './welcome';
import { AuthGuard } from './shared/can-activate-guards/auth.guard';
import { UnauthGuard } from './shared/can-activate-guards/unauth.guard';


/**
 * All frontend routes.
 */
const routes: RouterConfig = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }, // if they hit the website root
  { path: 'main', component: MainComponent, canActivate: [ AuthGuard ] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [ UnauthGuard ] }
];

/**
 * Provides all routes and canActivate guards needed for routes.
 */
export const appRouterProviders = [
  provideRouter(routes),
  AuthGuard,
  UnauthGuard
];