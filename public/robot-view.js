'use strict';

// eslint-disable-next-line no-unused-vars
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
    this.renderToolbar(root);
    this.renderBoardContainer(root);
  }

  renderToolbar(root) {
    const toolbar = document.createElement('div');
    toolbar.setAttribute('id', 'toolbar');
    root.appendChild(toolbar);
    this.appendSelect(toolbar);
    this.appendButton(toolbar, 'TURN-LEFT');
    this.appendButton(toolbar, 'MOVE');
    this.appendButton(toolbar, 'TURN-RIGHT');
    this.appendInputField(toolbar);
    this.appendButton(toolbar, 'RESET');
  }

  appendSelect(toolbar) {
    const select = document.createElement('select');
    select.setAttribute('id', 'levels');
    toolbar.appendChild(select);

    select.addEventListener('change', event => {
      this.controller.selectLevel(+event.target.value);
    });
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
      const option = document.createElement('option');
      option.setAttribute('value', level.id);
      option.innerHTML = level.title;
      select.appendChild(option);
    });
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
