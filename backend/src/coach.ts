/// Module for sending texts to users to do their workouts!

import { user, exercise } from './types';
import { collection } from './db';
import { sendMessage } from './message.ts';
import { exercises } from './exercises';

/**
 * If no user preferences set, will give a one hour break time.
 */
const defaultMinutesBeforeAnotherWorkout = 60;

/**
 * Get's a random number beteween (inclusive) `num1` and `num2`.
 */
const getRandomBetween = (num1: number, num2: number) => {
    return Math.floor(Math.random() * num2) + num1;
}

/**
 * Checks if `date` is more than `xMinutes` minutes old.
 *
 * TODO CHECK WROTE TIRED AS FUCK.
 */
const moreThanXMinutesOld = (xMinutes: number, date: Date): boolean => {
  let milliSeconds = xMinutes * 60 * 1000;
  let currentDate = new Date();

  return (currentDate.getTime() - milliSeconds > date.getTime());
}

/**
 * Will do a scan for users that need a workout, texting them accordingly.
 */
const scanForUsersNeedingAWorkout = () => {
  collection('users')
  .then((Users) => {
    // Get all users.
    Users.find({}).toArray()
    .then((arrayOfUsers: user[]) => {
      for(let user of arrayOfUsers) {
        let minutesBeforeAnotherWorkout = user.preferences.minutesBeforeAnotherWorkout || 60;
        if(moreThanXMinutesOld(minutesBeforeAnotherWorkout, user.lastTextDate)) {
          // User ready for another text.

          // TODO TMMRW.
          // let validExercises = filterExercisesByDifficulty...
          // get random number between 0 and validExercises.length - 1
          // get that exercise
          // figure out number of reps to send user
          // use `buildText` to build the text
          // use `sendMessage` to send it to the user
        }
      }
    })
  })
};

/**
 * Runs the `scanForUsersNeedingAWorkout` every `minuteIntervalForScan` minutes.
 */
export const startCoaching = (minuteIntervalForScan: number) => {
  setInterval(scanForUsersNeedingAWorkout, minuteIntervalForScan * 60 * 1000);
};
