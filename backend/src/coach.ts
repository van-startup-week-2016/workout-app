/// Module for sending texts to users to do their workouts!

import { user, exercise, workout } from './types';
import { collection } from './db';
import { sendMessage } from './message';
import { exercises } from './exercises';
import { Collection } from 'mongodb';


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
 */
const moreThanXMinutesOld = (xMinutes: number, date: Date): boolean => {
  let milliSeconds = xMinutes * 60 * 1000;
  let currentDate = new Date();

  return (currentDate.getTime() - milliSeconds > date.getTime());
}

/**
 * Sends the user their `currentWorkout`.
 */
const sendWorkout = (user: user): void => {
  const exercise: exercise = exercises[user.currentWorkout.exerciseID];
  const expirationDate = new Date(user.currentWorkout.date.getTime() + minToMilli(user.preferences.minutesBeforeAnotherWorkout));

  const textBody = `${exercise.buildText(user.currentWorkout.numberOfReps)}.

You have until ${formatAMPM(expirationDate)}!`;

  sendMessage(user.phone, textBody);
}

/**
 * Gets a workout for a user based on their preferences.
 */
const getWorkoutForUser = (user: user, randomMinutesBeforeText: number): workout => {
  const dateWillSendText = new Date((new Date().getTime()) + minToMilli(randomMinutesBeforeText));

  // First thing, randomely pick an exercise from the users list.
  // Look at the reps suggested, maybe +- a bit.
  const numberOfPotentialExercises = user.preferences.exercises.length;
  const randomIndex = getRandomBetween(1, numberOfPotentialExercises) - 1;
  const uniqueKey: string = user.preferences.exercises[randomIndex].uniqueKey;
  const repNumber: number = user.preferences.exercises[randomIndex].repNumber;
  const repDelta: number = Math.floor(repNumber/10) + 1;
  const randomRepNumber: number = getRandomBetween(repNumber - repDelta, repNumber + repDelta);

  const workout: workout = {
    date: dateWillSendText,
    exerciseID: uniqueKey,
    numberOfReps: randomRepNumber,
    completed: false
  };

  return workout;
}

/**
 * Convert minutes to milliseconds.
 */
const minToMilli = (numberOfMinutes: number) => {
  return numberOfMinutes * 60 * 1000;
}

/**
 * Copied from:
 *
 * http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
 */
const formatAMPM = (dateAsString: string) => {
  const date = new Date(dateAsString);
  var hours = date.getHours();
  var minutes: string | number = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = `${hours}:${minutes}${ampm}`;
  return strTime;
}

/**
 * Sends a text to the user with a random delay.
 */
const sendTextWithRandomDelay = (user: user, Users: Collection) => {
  const minutesBeforeAnotherWorkout = user.preferences.minutesBeforeAnotherWorkout || defaultMinutesBeforeAnotherWorkout;
  const randomMinutesBeforeText = getRandomBetween(0, minutesBeforeAnotherWorkout / 2);

  user.currentWorkout = getWorkoutForUser(user, randomMinutesBeforeText);

  Users.save(user)
  .then(() => {
    setTimeout(() => {
      sendWorkout(user);
    }, minToMilli(randomMinutesBeforeText));
  });
};

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
        // If they have never had a workout...
        if(user.currentWorkout == undefined) {
          sendTextWithRandomDelay(user, Users);
          console.log("Sending text to user, ", user.phone);
          continue;
        }

        let minutesBeforeAnotherWorkout = user.preferences.minutesBeforeAnotherWorkout || defaultMinutesBeforeAnotherWorkout;
        // If the time has elapsed for their previous workout...
        if(moreThanXMinutesOld(minutesBeforeAnotherWorkout, user.currentWorkout.date)) {
          // If they did complete it, it has already been copied.
          if(user.currentWorkout.completed == true) {
            sendTextWithRandomDelay(user, Users);
            console.log("Sending text to user, ", user.phone);
            continue;
          }
          // If they didn't complete it, we must move it to their workouts.
          user.workouts.push(user.currentWorkout);
          sendTextWithRandomDelay(user, Users);
          console.log("Sending text to user, ", user.phone);
        }
      }
    });
  })
};

/**
 * Runs the `scanForUsersNeedingAWorkout` every `minuteIntervalForScan` minutes.
 */
export const startCoaching = (minuteIntervalForScan: number) => {
  scanForUsersNeedingAWorkout();
  setInterval(scanForUsersNeedingAWorkout, minToMilli(minuteIntervalForScan));
};
