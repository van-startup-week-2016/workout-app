/// <reference path="../typings_manual/index.d.ts" />

import 'babel-polyfill';
import './global_augmentations';

import { server } from './server';
import { APP_CONFIG } from '../app-config';
import { user, exercise } from './types';
import { collection } from './db';
import { sendMessage } from './message.ts'
server.listen(APP_CONFIG.app.port);
console.log(`Running app on port ${APP_CONFIG.app.port}`);

let interval: number = 15;

//sample exercies 
let exercises: exercise[] = [
  {name: "Push Ups",
   difficulty: 2,
   description: "Do push ups",
   type: "Upper Body"},
    
  {name: "Sit Ups",
   difficulty: 2,
   description: "Do sit ups",
   type: "Core"},

   {name: "Jumping Jacks",
   difficulty: 2,
   description: "Do jumping jacks",
   type: "Cardio"},
];

setInterval(() => {
  
  collection("users")
  .then((Users) => {
    Users.find({}).toArray()
    .then((arrayOfUsers: user[]) => {
        sendWorkouts(arrayOfUsers);
    });
  })
  // Query mongo for users.


}, 5000 * 1 * interval);

function getRandomBetween(num1: number, num2: number){
    return Math.floor(Math.random() * num2) + num1;
}

function sendWorkouts(arrayOfUsers: user[]) {
    for (let user of arrayOfUsers) {
        let currentTime = new Date().getTime();
        let userTime  = user.lastWorkoutSentDate.getTime();
        var diff = currentTime - userTime;
        let minutesSinceLastSentWorkout = Math.round(diff / 60 * 1000);

        let userWorkoutIntervalInMinutes = 60; //default to 60 minutes (1 hour);
        if(minutesSinceLastSentWorkout >= userWorkoutIntervalInMinutes){
            //sendMessage(user.number, "DO YOUR WORKOUT");
            let randomNumber = getRandomBetween(3, 1);
            let exerciseName = exercises[randomNumber].name
            sendMessage("6046148295", `Do this: ${exerciseName}`);
        }
    }
}
