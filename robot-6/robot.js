'use strict';

(function () {
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
      let x = this.robot.x;
      let y = this.robot.y;

      switch (this.robot.dir) {
        case 'up':
          y = y < this.board.length - 1 ? y + 1 : y;
          break;
        case 'down':
          y = y > 0 ? y - 1 : y;
          break;
        case 'left':
          x = x > 0 ? x - 1 : x;
          break;
        case 'right':
          x = x < this.board[0].length - 1 ? x + 1 : x;
          break;
      }

      const cell = this.board[y][x];

      if (cell === '.' || cell === 'F' || cell === 'A') {
        this.board[this.robot.y][this.robot.x] = '.';
        this.robot.x = x;
        this.robot.y = y;
        this.board[y][x] = 'R';
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

  class View {

    constructor(model) {
      this.model = model;

      this.imageMap = {
        T: 'tree.png',
        W: 'water.png',
        F: 'goal.png',
        R: 'robot.png',
        A: 'apple.png',
        K: 'key.png',
        L: 'lock.png'
      };

      this.renderAll();
    }

    renderAll() {
      const root = document.getElementById('root');
      this.renderToolbar(root);
      this.renderBoardContainer(root);
      this.renderBoard();
    }

    renderToolbar(root) {
      const toolbar = document.createElement('div');
      root.appendChild(toolbar);
      toolbar.setAttribute('id', 'toolbar');

      const turnLeftButton = document.createElement('button');
      turnLeftButton.innerHTML = 'TURN-LEFT';
      turnLeftButton.addEventListener('click', () => {
        console.log('VIEW  button pressed: TURN-LEFT');
        this.model.turn('left');
        this.renderBoard();
      });
      toolbar.appendChild(turnLeftButton);

      const moveButton = document.createElement('button');
      moveButton.innerHTML = 'MOVE';
      moveButton.addEventListener('click', () => {
        console.log('VIEW  button pressed: MOVE');
        this.model.move();
        this.renderBoard();
      });
      toolbar.appendChild(moveButton);

      const turnRightButton = document.createElement('button');
      turnRightButton.innerHTML = 'TURN-RIGHT';
      turnRightButton.addEventListener('click', () => {
        console.log('VIEW  button pressed: TURN-RIGHT');
        this.model.turn('right');
        this.renderBoard();
      });
      toolbar.appendChild(turnRightButton);
    }

    renderBoardContainer(root) {
      const board = document.createElement('div');
      board.setAttribute('id', 'board');
      root.appendChild(board);
    }

    renderBoard() {
      console.log('VIEW  rendering');
      const board = document.getElementById('board');
      board.innerHTML = '';

      const table = document.createElement('table');
      board.appendChild(table);
      for (let row = this.model.board.length - 1; row >= 0; row--) {
        const cells = this.model.board[row];
        const tr = document.createElement('tr');
        table.appendChild(tr);
        let rowHtml = '';
        for (const cell of cells) {
          const img = this.imageMap[cell];
          let className = '';
          if (cell === 'R') {
            className = this.model.robot.dir;
            if (this.model.flagReached) {
              className += ' at-flag';
            }
          }
          const imgHtml = img ? `<img src="img/${img}" width="35" height="35">` : '';
          rowHtml += `<td class="${className}">${imgHtml}</td>`;
        }
        tr.innerHTML = rowHtml;
      }
    }
  }


  class RobotApp {
    constructor() {
      this.model = new Model();
      this.view = new View(this.model);
    }

    executeSequence(commands) {
      const queue = commands.slice();
      if (queue.length === 0) {
        return;
      }

      const intervalID = setInterval(() => {
        const command = queue.shift();
        this.execute(command);
        if (queue.length === 0) {
          clearInterval(intervalID);
        }
      }, 750);
    }

    execute(command) {
      console.log('execute: ' + command);
      switch (command) {
        case 'MOVE':
          this.model.move();
          break;
        case 'TURN-LEFT':
          this.model.turn('left');
          break;
        case 'TURN-RIGHT':
          this.model.turn('right');
          break;
        default:
          this.log('ignoring unexpected command:', command);
      }
      this.view.renderBoard();
    }

    run(commands) {
      const sequence = commands.english.map((command) => {
        return command.toUpperCase();
      });
      this.executeSequence(sequence);
    }
  }

  new RobotApp();

})();
