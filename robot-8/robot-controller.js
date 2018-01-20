'use strict';

// eslint-disable-next-line no-var
var RobotApp = RobotApp || {};

{
  const aliases = {
    'M': 'MOVE',
    'RIGHT': 'TURN-RIGHT',
    'R': 'TURN-RIGHT',
    'LEFT': 'TURN-LEFT',
    'L': 'TURN-LEFT',
    'P': 'PICK-UP',
    'PICKUP': 'PICKUP',
    'U': 'UNLOCK'
  };

  // eslint-disable-next-line no-unused-vars
  class Controller {

    constructor(model, log) {
      this.model = model;
      this.log = log;
    }

    selectLevel(id) {
      this.model.selectLevel(id);
    }

    execute(action) {
      this.log('CNTRL execute: ' + action);
      switch (action.type) {
        case 'MOVE':
          this.model.move();
          break;
        case 'TURN-LEFT':
          this.model.turn('left');
          break;
        case 'TURN-RIGHT':
          this.model.turn('right');
          break;
        case 'PICK-UP':
          this.model.pickUp();
          break;
        case 'UNLOCK':
          this.model.unlock();
          break;
        case 'INPUT':
          this.executeInput(action.payload);
          break;
        case 'RESET':
          this.model.reset();
          break;
        default:
          this.log('CNTRL ignoring unexpected command:', action);
      }
    }

    executeInput(text) {
      const commands = text
        .toUpperCase()
        .split(/\s/)
        .map(command => aliases[command] || command);

      this.executeTimedSequence(commands);
    }

/**
 * Executes an list of robot commands with delays in between
 * @param {string[]} commands
 */
executeTimedSequence(commands) {
  if (commands.length === 0) {
    return;
  }

  const queue = commands.slice();

  const intervalID = setInterval(() => {
    const command = queue.shift();
    this.execute({ type: command });
    if (queue.length === 0) {
      clearInterval(intervalID);
    }
  }, 750);
}
}

  RobotApp.Controller = Controller;

}
