/* eslint-disable no-var, no-unused-vars */

// I need to use var here because I need 'commands' to reside in the global scope
var commands = {
  english: [
    "move",
    "turn-right",
    "move",
    "move",
    "move",
    "turn-left",
    "move",
    "move"
  ],
  french: [
    "avancer",
    "à droit",
    "avancer",
    "avancer",
    "avancer",
    "à gauche",
    "avancer",
    "avancer"
  ],
  frenchWithNoise: [
    "s\'il vous plaît",
    "avancer",
    "puis",
    "à droit",
    "avancer",
    "avancer",
    "encore",
    "avancer",
    "à gauche",
    "avancer",
    "encore",
    "avancer"
  ],
  frenchToEnglish: {
    "avancer": "move",
    "à droit": "turn-right",
    "à gauche": "turn-left"
  },
  verbalCommands: [
    "Move and turn-right, then move, move and move again; next turn-left.",
    "Finally move and move for a second time.",
    "You have reached your destination."
  ]
};
