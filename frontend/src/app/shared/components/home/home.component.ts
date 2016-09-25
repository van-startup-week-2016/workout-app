import { Component, OnInit } from '@angular/core';

import { GlobalStateService, AuthService } from '../../';
import { storageType, user, workout, workoutForFrontend, exerciseHash, exerciseType } from '../../../types';


/**
 * The exercises, copied from backend, could easily query instead...hackathons...
 */
const exercises: exerciseHash = {
  "1": {
    name: "Regular Push-Up",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 regular push-up" : `Do ${numberOfReps} regular push-ups`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Regular Push-Up" : `${numberOfReps} Regular Push-Ups`);
    },
    types: [exerciseType.upperBody],
    howToLink: "https://www.youtube.com/watch?v=5eSM88TFzAs",
    insanelyHard: false,
    multiplier: 2
  },

  "2": {
    name: "Clap Push-Up",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 clap push-up" : `Do ${numberOfReps} clap push-ups`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Clap Push-Up" : `${numberOfReps} Clap Push-Ups`);
    },
    types: [exerciseType.upperBody],
    howToLink: "https://www.youtube.com/watch?v=k53ogCacHIQ",
    insanelyHard: true,
    multiplier: 3
  },

  "3": {
    name: "Military Push-Up",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 military push-up" : `Do ${numberOfReps} military push-ups`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Military Push-Up" : `${numberOfReps} Military Push-Ups`);
    },
    types: [exerciseType.upperBody],
    howToLink: "https://www.youtube.com/watch?v=ihvdd0rPTiU",
    insanelyHard: false,
    multiplier: 2
  },

  "4": {
    name: "Diamond Push-Up",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 diamond push-up" : `Do ${numberOfReps} diamond push-ups`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Diamond Push-Up" : `${numberOfReps} Diamond Push-Ups`);
    },
    types: [exerciseType.upperBody],
    howToLink: "https://www.youtube.com/watch?v=J0DnG1_S92I",
    insanelyHard: true,
    multiplier: 3
  },

  "5": {
    name: "Chair Dip",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 chair dip" : `Do ${numberOfReps} chair dips`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Chair Dip" : `${numberOfReps} Chair Dips`);
    },
    types: [exerciseType.upperBody],
    howToLink: "https://www.youtube.com/watch?v=6kALZikXxLc",
    insanelyHard: false,
    multiplier: 2
  },

  "6": {
    name: "Plank",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 second of plank" : `Do ${numberOfReps} seconds of plank`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Second of Plank" : `${numberOfReps} Seconds of Plank`);
    },
    types: [exerciseType.core],
    howToLink: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
    insanelyHard: false,
    multiplier: 1
  },

  "7": {
    name: "Sit-up",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 sit-up" : `Do ${numberOfReps} sit-ups`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Sit-Up" : `${numberOfReps} Sit-Ups`);
    },
    types: [exerciseType.core],
    howToLink: "https://www.youtube.com/watch?v=jDwoBqPH0jk",
    insanelyHard: false,
    multiplier: 2
  },

  "8": {
    name: "Squat",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 squat" : `Do ${numberOfReps} squats`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Squat" : `${numberOfReps} Squats`);
    },
    types: [exerciseType.lowerBody],
    howToLink: "https://www.youtube.com/watch?v=jGQ8_IMPQOY",
    insanelyHard: false,
    multiplier: 2
  },

  "9": {
    name: "One-legged Squat",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 one-legged squat" : `Do ${numberOfReps} one-legged squats`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 One-Legged Squat" : `${numberOfReps} One-Legged Squats`);
    },
    types: [exerciseType.lowerBody],
    howToLink: "https://www.youtube.com/watch?v=u1JSSvzwh3I",
    insanelyHard: true,
    multiplier: 4
  },

  "10": {
    name: "Jumping Jack",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 jumping jack" : `Do ${numberOfReps} jumping jacks`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Jumping Jack" : `${numberOfReps} Jumping Jacks`);
    },
    types: [exerciseType.lowerBody],
    howToLink: "https://www.youtube.com/watch?v=dmYwZH_BNd0",
    insanelyHard: false,
    multiplier: 1
  },

  "11": {
    name: "Burpee",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 burpee" : `Do ${numberOfReps} burpees`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Burpee" : `${numberOfReps} Burpees`);
    },
    types: [exerciseType.lowerBody, exerciseType.upperBody],
    howToLink: "https://www.youtube.com/watch?v=3uFcOWz9qN8",
    insanelyHard: false,
    multiplier: 3
  },

  "12": {
    name: "Mountain Climber",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 mountain climber" : `Do ${numberOfReps} mountain climbers`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Mountain Climber" : `${numberOfReps} Mountain Climbers`);
    },
    types: [exerciseType.lowerBody, exerciseType.upperBody, exerciseType.core],
    howToLink: "https://www.youtube.com/watch?v=DyeZM-_VnRc",
    insanelyHard: false,
    multiplier: 2
  },

  "13": {
    name: "Lunge",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 lunge" : `Do ${numberOfReps} lunges`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Lunge" : `${numberOfReps} Lunges`);
    },
    types: [exerciseType.lowerBody],
    howToLink: "https://www.youtube.com/watch?v=COKYKgQ8KR0",
    insanelyHard: false,
    multiplier: 2
  },

  "14": {
    name: "Squat Jump",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 squat jump" : `Do ${numberOfReps} squat jumps`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Squat Jump" : `${numberOfReps} Squat Jumps`);
    },
    types: [exerciseType.lowerBody],
    howToLink: "https://www.youtube.com/watch?v=U4s4mEQ5VqU",
    insanelyHard: false,
    multiplier: 2
  },

  "15": {
    name: "Tuck Jump",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 tuck jump" : `Do ${numberOfReps} tuck jumps`);
    },
    buildTitle: (numberOfReps) => {
      return (numberOfReps == 1 ? "1 Tuck Jump" : `${numberOfReps} Tuck Jumps`);
    },
    types: [exerciseType.lowerBody],
    howToLink: "https://www.youtube.com/watch?v=r7oBejx1PHM",
    insanelyHard: false,
    multiplier: 2
  }
};

const goodQuotes: string[] = [
  "Great job!",
  "Congrats!",
  "Way to go!",
  "Rock on!",
  "You're a beast!",
  "Work it baby!",
  "You got it!",
  "Yeah!",
  "Beautiful!",
  "Like a pro!"
];

const badQuotes: string[] = [
  "Shhhhhh...",
  "Crap.",
  "At least it's a nice blue.",
  "No one saw that...",
  "Every time you miss a workout, a puppy dies. A cute one."
];

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  private workouts: workoutForFrontend[];
  private user: user;

  constructor(private globalStateService: GlobalStateService, private authService: AuthService) {
    this.user = this.globalStateService.read('user', storageType.LocalStorage);
    this.workouts = this.user.workouts.map((workout) => {
      let frontEndWorkout: workoutForFrontend = {
        date: workout.date,
        exercise: exercises[workout.exerciseID],
        completed: workout.completed,
        numberOfReps: workout.numberOfReps
      };
      return frontEndWorkout;
    }).reverse();

    // Every 1 seconds, update user.
    setInterval(() => {
      this.authService.account()
      .subscribe((user) => {
        this.user = user;
        this.workouts = user.workouts.map((workout) => {
          let frontEndWorkout: workoutForFrontend = {
            date: workout.date,
            exercise: exercises[workout.exerciseID],
            completed: workout.completed,
            numberOfReps: workout.numberOfReps
          };
          return frontEndWorkout;
        }).reverse();
      });
    }, 1 * 1000);
   }

  ngOnInit() { }

  private getColorForCompleted(completed: boolean): string {
    return (completed ? "#00C78C" : "#6cbfee");
  }

  private formatAMPM(dateAsString: string) {
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
   * Gets the motivations quote to display depending on whether it was completed
   * or not.
   */
  private getQuote(completed: boolean, index: number): string {
    if (completed) {
      const arrayLength = goodQuotes.length;
      const newIndex = index % arrayLength;
      const quote: string = goodQuotes[newIndex];
      return quote;
    }
    const arrayLength = badQuotes.length;
    const newIndex = index % arrayLength;
    const quote: string = badQuotes[newIndex];
    return quote;
  }


}
