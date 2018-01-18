// eslint-disable-next-line no-var, no-unused-vars
var RobotApp = RobotApp || {};

(function () {
  'use strict';

  class Model {

    constructor() {
      this.board = [
        ['T', 'T', '.', 'F'],
        ['T', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['R', '.', '.', 'W']
      ];

      this.board.reverse();

      this.robot = {
        x: 0,
        y: 0,
        dir: 'up'
      };

      this.moves = 0;
      this.turns = 0;
      this.flagReached = false;
      this.appleEaten = false;
      this.applesEaten = 0;
    }

    move() {
      console.log('MODEL executing move()');
      this.appleEaten = false;
      this.flagReached = false;
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

      const cell = this.board[newY][newX];

      if (cell === '.' || cell === 'F' || cell === 'A') {
        this.board[y][x] = '.';
        this.robot.x = newX;
        this.robot.y = newY;
        this.board[newY][newX] = 'R';
        if (cell === 'F') {
          this.flagReached = true;
          console.log(`MODEL flag reached in ${this.moves} moves and ${this.turns} turns`);
          if (this.applesEaten > 0) {
            console.log('MODEL total apples eaten: ' + this.applesEaten);
          }
        } else if (cell === 'A') {
          this.appleEaten = true;
          this.applesEaten += 1;
          console.log('MODEL apple eaten: YUM');
        }
      } else {
        console.log('MODEL move blocked by obstacle');
      }

      this.moves += 1;
    }

    turn(turnDirection) {
      if (turnDirection !== 'left' && turnDirection !== 'right') {
        console.log('MODEL ignoring invalid turn', turnDirection);
        return;
      }

      console.log('MODEL executing turn()');

      switch (this.robot.dir) {
        case 'up':
          this.robot.dir = turnDirection === 'left' ? 'left' : 'right';
          break;
        case 'down':
          this.robot.dir = turnDirection === 'left' ? 'right' : 'left';
          break;
        case 'left':
          this.robot.dir = turnDirection === 'left' ? 'down' : 'up';
          break;
        case 'right':
          this.robot.dir = turnDirection === 'left' ? 'up' : 'down';
          break;
      }

      this.turns += 1;
    }
  }

  RobotApp.Model = Model;

})();
