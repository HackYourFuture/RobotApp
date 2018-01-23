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
      this.renderLeftPanel(root);
      this.renderRightPanel(root);
    }

    renderLeftPanel(root) {
      const form = this.renderForm(root);
      const textArea = this.renderTextArea(form);
      this.renderLeftToolbar(form, textArea);
    }

    renderForm(root) {
      const form = document.createElement('form');
      root.appendChild(form);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = form['json-data'].value.trim();
        if (text) {
          this.handleInput(text);
        }
      });
      return form;
    }

    renderTextArea(parent) {
      const textArea = document.createElement('textarea');
      textArea.classList.add('json-input');
      textArea.setAttribute('name', 'json-data');
      parent.appendChild(textArea);
      return textArea;
    }

    renderLeftToolbar(parent, textArea) {
      const toolbar = document.createElement('div');
      toolbar.classList.add('toolbar');
      parent.appendChild(toolbar);
      this.addClearButton(toolbar, textArea);
      this.addSubmitButton(toolbar);
    }

    addClearButton(parent, textArea) {
      const button = document.createElement('button');
      parent.appendChild(button);
      button.setAttribute('type', 'button');
      button.innerHTML = 'CLEAR';
      button.addEventListener('click', () => {
        textArea.value = '';
        textArea.focus();
      });
    }

    addSubmitButton(parent) {
      const button = document.createElement('button');
      parent.appendChild(button);
      button.setAttribute('type', 'submit');
      button.innerHTML = 'SUBMIT';
    }

    renderRightPanel(root) {
      const panel = document.createElement('div');
      root.appendChild(panel);
      panel.classList.add('right-panel');
      this.renderRightToolbar(panel);
      this.renderBoardContainer(panel);
    }

    renderRightToolbar(parent) {
      const toolbar = document.createElement('div');
      toolbar.classList.add('toolbar');
      parent.appendChild(toolbar);
      this.addToolbarButton(toolbar, 'TURN-LEFT');
      this.addToolbarButton(toolbar, 'MOVE');
      this.addToolbarButton(toolbar, 'TURN-RIGHT');
      this.addToolbarButton(toolbar, 'RESET');
    }

    addToolbarButton(parent, actionType) {
      const button = document.createElement('button');
      button.innerHTML = actionType;
      button.addEventListener('click', () => {
        this.log('VIEW  button pressed: ' + actionType);
        this.controller.execute({ type: actionType });
      });
      parent.appendChild(button);
    }

    handleInput(text) {
      this.log('VIEW  input');
      this.controller.execute({
        type: 'SUBMIT',
        payload: text
      });
    }

    renderBoardContainer(parent) {
      const board = document.createElement('div');
      board.setAttribute('id', 'board');
      parent.appendChild(board);
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
