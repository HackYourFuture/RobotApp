'use strict';

// eslint-disable-next-line no-var
var RobotApp = RobotApp || {};

// eslint-disable-next-line no-var, no-unused-vars
{
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
      toolbar.setAttribute('id', 'toolbar');
      root.appendChild(toolbar);

      this.appendButton(toolbar, 'TURN-LEFT', () => {
        console.log('VIEW  button pressed: TURN-LEFT');
        this.model.turn('left');
        this.renderBoard();
      });

      this.appendButton(toolbar, 'MOVE', () => {
        console.log('VIEW  button pressed: MOVE');
        this.model.move();
        this.renderBoard();
      });

      this.appendButton(toolbar, 'TURN-RIGHT', () => {
        console.log('VIEW  button pressed: TURN-RIGHT');
        this.model.turn('right');
        this.renderBoard();
      });
    }

    appendButton(toolbar, command, handler) {
      const button = document.createElement('button');
      button.innerHTML = command;
      button.addEventListener('click', handler);
      toolbar.appendChild(button);
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

  const model = new RobotApp.Model();
  new View(model);

}
