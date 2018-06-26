'use strict';

{
  function createAndAppend(name, parent, options = {}) {
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

  class RobotView {

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
      const form = createAndAppend('form', root);
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
      return createAndAppend('textarea', parent, {
        class: 'json-input',
        name: 'json-data'
      });
    }

    renderLeftToolbar(parent, textArea) {
      const toolbar = createAndAppend('div', parent, { class: 'toolbar' });
      this.addClearButton(toolbar, textArea);
      this.addSubmitButton(toolbar);
    }

    addClearButton(parent, textArea) {
      const button = createAndAppend('button', parent, { type: 'button', text: 'CLEAR' });
      button.addEventListener('click', () => {
        textArea.value = '';
        textArea.focus();
      });
    }

    addSubmitButton(parent) {
      createAndAppend('button', parent, { type: 'submit', text: 'SUBMIT' });
    }

    renderRightPanel(root) {
      const panel = createAndAppend('div', root, { class: 'right-panel' });
      this.renderRightToolbar(panel);
      this.renderBoardContainer(panel);
    }

    renderRightToolbar(parent) {
      const toolbar = createAndAppend('div', parent, { class: 'toolbar' });
      this.appendSelect(toolbar);
      this.appendButton(toolbar, 'TURN-LEFT');
      this.appendButton(toolbar, 'MOVE');
      this.appendButton(toolbar, 'TURN-RIGHT');
      this.appendButton(toolbar, 'RESET');
    }

    appendSelect(parent) {
      const select = createAndAppend('select', parent, { id: 'levels' });
      select.addEventListener('change', event => {
        this.controller.selectLevel(+event.target.value);
      });
    }

    appendButton(parent, actionType) {
      const button = createAndAppend('button', parent, { text: actionType });
      button.addEventListener('click', () => {
        this.log('VIEW  button pressed: ' + actionType);
        this.controller.execute({ type: actionType });
      });
    }

    handleInput(text) {
      this.log('VIEW  input');
      this.controller.execute({
        type: 'SUBMIT',
        payload: text
      });
    }

    renderBoardContainer(parent) {
      const board = createAndAppend('div', parent, { id: 'board' });
      parent.appendChild(board);
    }

    update(type) {
      switch (type) {
        case 'STATE_CHANGE':
          this.renderBoard();
          break;
        case 'LEVELS_LOADED':
          this.renderSelectOptions();
          break;
        default:
          this.log('VIEW  unknown update type:', type);
      }
    }

    renderSelectOptions() {
      const select = document.getElementById('levels');
      select.innerHTML = '';
      this.model.levels.forEach(level => {
        createAndAppend('option', select, { value: level.id, text: level.title });
      });
    }

    renderBoard() {
      this.log('VIEW  rendering');
      const board = document.getElementById('board');
      board.innerHTML = '';
      const table = createAndAppend('table', board);
      for (let row = this.model.board.length - 1; row >= 0; row--) {
        const cells = this.model.board[row];
        const tr = createAndAppend('tr', table);
        for (const cell of cells) {
          let className = '';
          if (cell === 'R') {
            className = this.model.robot.dir;
            if (this.model.flagReached) {
              className += ' at-flag';
            }
          }
          const td = createAndAppend('td', tr, { class: className });
          const imageSrc = this.imageMap[cell];
          if (imageSrc) {
            createAndAppend('img', td, { src: `img/${imageSrc}`, width: 35, height: 35 });
          }
        }
      }
    }
  }

  window.RobotView = RobotView;
}
