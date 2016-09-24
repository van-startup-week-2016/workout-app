import { exerciseHash, exerciseType } from "./types";

/**
 * A static list of existing exercises.
 */
export const exercises: exerciseHash = {
  "1": {
    name: "Push Up",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 pushup" : `Do ${numberOfReps} pushups`);
    },
    types: [exerciseType.upperBody],
    howToLink: "https://www.nerdfitness.com/blog/2011/02/15/proper-push-up/",
    insanelyHard: false
  }
};

// TODO ADD MORE