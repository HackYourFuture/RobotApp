'use strict';

{
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
      this.lastMessage = '';
    }

    move() {
      this.lastMessage = '';
      this.appleEaten = false;
      this.flagReached = false;
      let x = this.robot.x;
      let y = this.robot.y;

      switch (this.robot.dir) {
        case 'up':
          y = Math.min(this.board.length - 1, y + 1);
          break;
        case 'down':
          y = Math.max(0, y - 1);
          break;
        case 'left':
          x = Math.max(0, x - 1);
          break;
        case 'right':
          x = Math.min(this.board[y].length - 1, x + 1);
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
          this.lastMessage = `Flag reached in ${this.moves} moves and ${this.turns} turns.`;

          if (this.applesEaten > 0) {
            this.lastMessage += ` Total apples eaten: ${this.applesEaten}`;
          }
        } else if (cell === 'A') {
          this.appleEaten = true;
          this.applesEaten += 1;
          this.lastMessage = 'Apple eaten: YUM!';
        }
      } else {
        this.lastMessage = 'Move blocked by obstacle.';
      }

      this.moves += 1;
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
    }
  }

  class View {
    static createAndAppend(name, parent, options = {}) {
      const elem = document.createElement(name);
      parent.appendChild(elem);
      Object.keys(options).forEach((key) => {
        const value = options[key];
        if (key === 'text') {
          elem.innerText = value;
        } else {
          elem.setAttribute(key, value);
        }
      });
      return elem;
    }

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

      this.initialize();
    }

    initialize() {
      this.rootDiv = document.getElementById('root');
      this.renderToolbar();
      this.boardContainer = this.renderBoardContainer();
      this.messageContainer = this.renderMessageArea();
      this.renderBoard();
    }

    renderMessageArea() {
      return View.createAndAppend('div', this.rootDiv, { id: 'message-area' });
    }

    renderToolbar() {
      const toolbar = View.createAndAppend('div', this.rootDiv, { class: 'toolbar' });

      const turnLeftButton = View.createAndAppend('button', toolbar, { text: 'TURN-LEFT' });
      turnLeftButton.addEventListener('click', () => {
        this.model.turn('left');
        this.renderBoard();
      });

      const moveButton = View.createAndAppend('button', toolbar, { text: 'MOVE' });
      moveButton.addEventListener('click', () => {
        this.model.move();
        this.renderBoard();
      });

      const turnRightButton = View.createAndAppend('button', toolbar, { text: 'TURN-RIGHT' });
      turnRightButton.addEventListener('click', () => {
        this.model.turn('right');
        this.renderBoard();
      });
    }

    renderBoardContainer() {
      return View.createAndAppend('div', this.rootDiv, { id: 'board' });
    }

    renderBoard() {
      this.boardContainer.innerHTML = '';

      const table = View.createAndAppend('table', this.boardContainer);
      for (let row = this.model.board.length - 1; row >= 0; row--) {
        const cells = this.model.board[row];
        const tr = View.createAndAppend('tr', table);
        for (const cell of cells) {
          const imgData = this.imageMap[cell];
          let className = '';
          if (cell === 'R') {
            className = this.model.robot.dir;
            if (this.model.flagReached) {
              className += ' at-flag';
            }
          }
          const td = View.createAndAppend('td', tr, { class: className });
          if (imgData) {
            View.createAndAppend('img', td, { src: `assets/${imgData}`, width: 35, height: 35 });
          }
        }
      }

      if (this.model.lastMessage) {
        this.messageContainer.removeAttribute('hidden');
        this.messageContainer.innerText = this.model.lastMessage;
      } else {
        this.messageContainer.setAttribute('hidden', '');
      }
    }
  }

  class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
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

  function main() {
    const model = new Model();
    const view = new View(model);
    new Controller(model, view);
  }

  window.onload = main;
}
