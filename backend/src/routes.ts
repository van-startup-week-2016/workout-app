/// Module for encapsaluting all routes for the API. Any complex logic in here
/// should be moved to a seperate module.

import passport from 'passport';
import R from 'ramda';

import { APP_CONFIG } from '../app-config';
import { userModel } from './models/user.model';
import { appRoutes, user } from './types';
import { collection } from './db';
import { sendMessage } from './message';
import { exercises } from './exercises';

/**
 * All routes by default will be assumed to require authentication, routes that
 * do not must be listed below. The API base url need not be included in the
 * array as it is `map`ed on.
 */
export const apiAuthlessRoutes = [
  '/register',
  '/login',
  '/twilioHook'
].map((route) => `${APP_CONFIG.app.apiSuffix}${route}`);

/**
 * The routes for the API.
 */
export const routes: appRoutes = {

  '/register': {
    /**
     * Register a user for the application, requires a username and password.
     */
    post: (req, res, next) => {

      passport.authenticate('sign-up', (err, user, info) => {
        // A 500-like error.
        if(err) {
          next(err);
          return;
        }

        // If no user an error must have occured.
        if(!user) {
          res.status(400).json(
            { message: info.message, errorCode: info.errorCode }
          );
          return;
        }

        // Log user in.
        req.login(user, (err) => {
          if(err) {
            next(err);
            return;
          }

          res.status(201).json(userModel.stripSensitiveDataForResponse(user));
          return;
        });
      })(req, res, next);
    }
  },

  '/login': {
    /**
     * Logs a user in and returns the user or a standard error + code.
     */
    post: (req, res, next) => {
      passport.authenticate('login', (err, user, info) => {
        // A 500-like error
        if (err) {
          next(err);
          return;
        }

        // If no user an error must have occured.
        if (!user) {
          res.status(400).json(
            { message: info.message, errorCode: info.errorCode }
          );
          return;
        }

        // Log user in.
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }

          res.status(200).json(userModel.stripSensitiveDataForResponse(user));
          return;
        });
      })(req, res, next);
    }
  },

  '/account': {
    /**
     * Returns the users account with sensitive data stripped.
     */
    get: (req, res, next) => {
      res.status(200).json(userModel.stripSensitiveDataForResponse(req.user));
      return;
    }
  },
  '/twilioHook': {
    get: (req, res, next) => {
      // Drops country code '+1'
      const fromPhone = (req.query.From as string).substring(2);
      collection('users')
      .then((Users) => {
        Users.findOne({ phone: fromPhone })
        .then((user: user) => {
          if(user) {
            res.status(200);

            // User has not recieved a text from us yet.
            if(user.currentWorkout == undefined) {
              return;
            }
            // Check that the date of the workout is earlier than now.
            const timeOfWorkoutWasInThePast: boolean = user.currentWorkout.date.getTime() < new Date().getTime();
            if(timeOfWorkoutWasInThePast && !user.currentWorkout.completed) {
              user.currentWorkout.completed = true;
              user.workouts.push(user.currentWorkout);
              // add points to user's score
              const multiplier: number = exercises[user.currentWorkout.exerciseID].multiplier;
              const pointsToAdd: number = user.currentWorkout.numberOfReps * multiplier;
              user.score = (user.score || 0) + pointsToAdd;
              Users.save(user);
              return;
            }

            // TODO maybe text them back saying they missed it...
          }
          res.status(400).json({ message: "A user who is not registered messaged", queryParams: req.query});
          return;
        });
      });
    }
  }
}
