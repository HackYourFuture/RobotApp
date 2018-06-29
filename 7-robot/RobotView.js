'use strict';

{
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

    constructor(model, controller) {
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
      this.model.subscribe(this);
      this.initialize();
    }

    initialize() {
      this.rootDiv = document.getElementById('root');
      this.renderLeftPanel();
      const rightPanel = this.renderRightPanel();
      this.boardContainer = this.renderBoardContainer(rightPanel);
      this.messageContainer = this.renderMessageArea(rightPanel);
    }

    renderLeftPanel() {
      const form = this.renderForm();
      const textArea = this.renderTextArea(form);
      this.renderLeftToolbar(form, textArea);
    }

    renderRightPanel() {
      const panel = View.createAndAppend('div', this.rootDiv, { class: 'right-panel' });
      this.renderRightToolbar(panel);
      return panel;
    }

    renderBoardContainer(parent) {
      return View.createAndAppend('div', parent, { id: 'board' });
    }

    renderMessageArea(parent) {
      return View.createAndAppend('div', parent, { id: 'message-area' });
    }

    renderForm() {
      const form = View.createAndAppend('form', this.rootDiv);
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
      return View.createAndAppend('textarea', parent, { name: 'json-data', class: 'json-input' });
    }

    renderLeftToolbar(parent, textArea) {
      const toolbar = View.createAndAppend('div', parent, { class: 'toolbar' });
      this.addClearButton(toolbar, textArea);
      this.addRunButton(toolbar);
    }

    addClearButton(parent, textArea) {
      const button = View.createAndAppend('button', parent, { type: 'button', text: 'CLEAR' });
      button.addEventListener('click', () => {
        textArea.value = '';
        textArea.focus();
      });
    }

    addRunButton(parent) {
      View.createAndAppend('button', parent, { type: 'submit', text: 'RUN' });
    }

    renderRightToolbar(parent) {
      const toolbar = View.createAndAppend('div', parent, { class: 'toolbar' });
      this.addToolbarButton(toolbar, 'TURN-LEFT');
      this.addToolbarButton(toolbar, 'MOVE');
      this.addToolbarButton(toolbar, 'TURN-RIGHT');
      this.addToolbarButton(toolbar, 'RESET');
    }

    addToolbarButton(parent, actionType) {
      const button = View.createAndAppend('button', parent, { text: actionType });
      button.addEventListener('click', () => {
        this.controller.execute({ type: actionType });
      });
    }

    handleInput(text) {
      this.controller.execute({
        type: 'SUBMIT',
        payload: text
      });
    }

    update() {
      this.renderBoard();
    }

    renderBoard() {
      this.boardContainer.innerHTML = '';
      const table = View.createAndAppend('table', this.boardContainer);
      for (let row = this.model.board.length - 1; row >= 0; row--) {
        const cells = this.model.board[row];
        const tr = View.createAndAppend('tr', table);
        for (const cell of cells) {
          let className = '';
          if (cell === 'R') {
            className = this.model.robot.dir;
            if (this.model.flagReached) {
              className += ' at-flag';
            }
          }
          const td = View.createAndAppend('td', tr, { class: className });
          const imageSrc = this.imageMap[cell];
          if (imageSrc) {
            View.createAndAppend('img', td, { src: `assets/${imageSrc}`, width: 35, height: 35 });
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

  window.RobotView = View;
}
