'use strict';

{
  class Controller {
    constructor(model) {
      this.model = model;
    }

    selectLevel(id) {
      this.model.selectLevel(id);
    }

    execute(action) {
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
        case 'SUBMIT':
          this.executeInput(action.payload);
          break;
        case 'RESET':
          this.model.reset();
          break;
        default:
          console.error('Ignoring unexpected action:', action);
      }
    }

    executeInput(payload) {
      const commands = payload
        .toUpperCase()
        .split(/[;\s]+/)
        .map(command => command.trim())
        .filter(command => command !== '');
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

  window.RobotController = Controller;
}
