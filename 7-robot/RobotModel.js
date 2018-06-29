'use strict';

{
  class Model {
    constructor() {
      this.observers = [];
    }

    initialize(level) {
      this.level = level;
      this.reset();
    }

    reset() {
      if (!this.level) {
        console.error('Missing level');
        return;
      }
      this.board = this.level.board.map(row => row.split(''));
      this.robot = Object.assign({}, this.level.robot);
      this.board.reverse();
      this.moves = 0;
      this.turns = 0;
      this.flagReached = false;
      this.appleEaten = false;
      this.applesEaten = 0;
      this.pickedUpKey = false;
      this.lastMessage = '';
      this.notify();
    }

    subscribe(observer) {
      if (typeof observer.update === 'function') {
        this.observers.push(observer);
      } else {
        console.error("Can't subscribe observer without update function");
      }
    }

    notify() {
      this.observers.forEach(observer => observer.update());
    }

    move() {
      this.lastMessage = '';
      this.appleEaten = false;
      this.flagReached = false;

      const { x, y } = this.robot;
      const [newX, newY] = this.getNewPosition();
      const cell = this.board[newY][newX];

      if (cell === '.' || cell === 'F' || cell === 'A') {
        this.board[y][x] = '.';
        this.robot.x = newX;
        this.robot.y = newY;
        this.board[newY][newX] = 'R';
        if (cell === 'F') {
          this.flagReached = true;
          this.lastMessage = `Flag reached in ${this.moves} moves and ${this.turns} turns.`;
          if (this.applesEaten > 0) {
            this.lastMessage += ` Total apples eaten: ${this.applesEaten}.`;
          }
        } else if (cell === 'A') {
          this.appleEaten = true;
          this.applesEaten += 1;
          this.lastMessage('YUM!');
        }
      } else {
        this.lastMessage = 'Move blocked by obstacle.';
      }
      this.moves += 1;
      this.notify();
    }

    turn(turnDirection) {
      this.lastMessage = '';
      let isLeftTurn;
      switch (turnDirection) {
        case 'left':
          isLeftTurn = true;
          break;
        case 'right':
          isLeftTurn = false;
          break;
        default:
          console.error('ignoring invalid turn', turnDirection);
          return;
      }

      switch (this.robot.dir) {
        case 'up':
          this.robot.dir = isLeftTurn ? 'left' : 'right';
          break;
        case 'down':
          this.robot.dir = isLeftTurn ? 'right' : 'left';
          break;
        case 'left':
          this.robot.dir = isLeftTurn ? 'down' : 'up';
          break;
        case 'right':
          this.robot.dir = isLeftTurn ? 'up' : 'down';
          break;
      }

      this.turns += 1;
      this.notify();
    }

    pickUp() {
      this.lastMessage = '';
      const [x, y] = this.getNewPosition();
      if (this.board[y][x] === 'K') {
        this.pickedUpKey = true;
        this.board[y][x] = '.';
        this.lastMessage = 'Picked up key.';
        this.notify();
      }
    }

    unlock() {
      this.lastMessage = '';
      const [x, y] = this.getNewPosition();
      if (this.board[y][x] === 'L') {
        if (this.pickedUpKey) {
          this.board[y][x] = '.';
          this.lastMessage = 'Unlocked!';
          this.notify();
        } else {
          this.lastMessage = "Can't UNLOCK: have no key.";
        }
      }
    }

    getNewPosition() {
      const { x, y } = this.robot;
      let [newX, newY] = [x, y];

      switch (this.robot.dir) {
        case 'up':
          newY = Math.min(this.board.length - 1, y + 1);
          break;
        case 'down':
          newY = Math.max(0, y - 1);
          break;
        case 'left':
          newX = Math.max(0, x - 1);
          break;
        case 'right':
          newX = Math.min(this.board[y].length - 1, x + 1);
          break;
      }

      return [newX, newY];
    }
  }

  window.RobotModel = Model;
}
