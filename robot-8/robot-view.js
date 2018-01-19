'use strict';

// eslint-disable-next-line no-var
var RobotApp = RobotApp || {};

{
  class View {

    constructor(model, controller, log) {
      this.imageMap = {
        T: 'tree.png',
        W: 'water.png',
        F: 'goal.png',
        R: 'robot.png',
        A: 'apple.png',
        K: 'key.png',
        L: 'lock.png'
      };

      this.model = model;
      this.controller = controller;
      this.log = log;

      this.model.subscribe(this);

      this.renderAll();
    }

    renderAll() {
      const root = document.getElementById('root');
      this.renderToolbar(root);
      this.renderBoardContainer(root);
    }

    renderToolbar(root) {
      const toolbar = document.createElement('div');
      toolbar.setAttribute('id', 'toolbar');
      root.appendChild(toolbar);
      this.appendButton(toolbar, 'TURN-LEFT');
      this.appendButton(toolbar, 'MOVE');
      this.appendButton(toolbar, 'TURN-RIGHT');
      this.appendInputField(toolbar);
      this.appendButton(toolbar, 'RESET');
    }

    appendButton(toolbar, actionType) {
      const button = document.createElement('button');
      button.innerHTML = actionType;
      button.addEventListener('click', () => {
        this.log('VIEW  button pressed: ' + actionType);
        this.controller.execute({ type: actionType });
      });
      toolbar.appendChild(button);
    }

    appendInputField(toolbar) {
      const input = document.createElement('input');
      toolbar.appendChild(input);
      input.setAttribute('name', 'input');
      input.setAttribute('type', 'text');
      input.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.handleInput(input);
        }
      });

      const button = document.createElement('button');
      toolbar.appendChild(button);
      const label = document.createTextNode('EXECUTE');
      button.appendChild(label);
      button.addEventListener('click', () => this.handleInput(input));
    }

    handleInput(input) {
      this.log('VIEW  input');
      this.controller.execute({
        type: 'INPUT',
        payload: input.value.trim()
      });
    }

    renderBoardContainer(root) {
      const board = document.createElement('div');
      board.setAttribute('id', 'board');
      root.appendChild(board);
    }

    update() {
      this.renderBoard();
    }

    renderBoard() {
      this.log('VIEW  rendering');
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

  RobotApp.View = View;

}
