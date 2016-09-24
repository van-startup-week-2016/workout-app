import { exercise, difficulty, exerciseType } from "./types";

/**
 * A static list of existing exercises.
 */
export const exercises: exercise[] =
[
  {
    name: "Push Up",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 pushup" : `Do ${numberOfReps} pushups`);
    },
    difficulty: difficulty.easy,
    types: [exerciseType.upperBody],
    howToLink: "https://www.nerdfitness.com/blog/2011/02/15/proper-push-up/"
  }
  // TODO ADD MORE EXERCISES, refer to syntax above.
]