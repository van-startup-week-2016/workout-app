import { exerciseHash, exerciseType } from "./types";

/**
 * A static list of existing exercises.
 */
export const exercises: exerciseHash = {
  "1": {
    name: "Regular Push-Up",
    buildText: (numberOfReps) => {
      return (numberOfReps == 1 ? "Do 1 regular push-up" : `Do ${numberOfReps} regular push-ups`);
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
    types: [exerciseType.lowerBody],
    howToLink: "https://www.youtube.com/watch?v=r7oBejx1PHM",
    insanelyHard: false,
    multiplier: 2
  }
};