'use strict';

{
  const board = [
    ['T', 'T', '.', 'F'],
    ['T', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['R', '.', '.', 'W']
  ];

  const robot = {
    x: 0,
    y: 0,
    dir: 'up'
  };

  let moves = 0;
  let turns = 0;
  let applesEaten = 0;

  const trailIndicators = {
    left: '←',
    right: '→',
    up: '↑',
    down: '↓'
  };

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach(function (key) {
      const value = options[key];
      if (key === 'text') {
        elem.innerText = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderToolbar(root) {
    const toolbar = createAndAppend('div', root, { class: 'toolbar' });

    const turnLeftButton = createAndAppend('button', toolbar, { text: 'TURN-LEFT' });
    turnLeftButton.addEventListener('click', function () {
      turn('left');
    });

    const moveButton = createAndAppend('button', toolbar, { text: 'MOVE' });
    moveButton.addEventListener('click', function () {
      move();
    });

    const turnRightButton = createAndAppend('button', toolbar, { text: 'TURN-RIGHT' });
    turnRightButton.addEventListener('click', function () {
      turn('right');
    });
  }

  function renderBoardContainer(root) {
    createAndAppend('div', root, { id: 'board' });
  }

  function renderBoard() {
    const elem = document.getElementById('board');
    elem.innerHTML = '';

    board[robot.y][robot.x] = 'R' + trailIndicators[robot.dir];

    const table = createAndAppend('table', elem);
    for (let row = board.length - 1; row >= 0; row--) {
      const cells = board[row];
      const tr = createAndAppend('tr', table);
      for (let col = 0; col < cells.length; col++) {
        const text = cells[col] === '.' ? '' : cells[col];
        createAndAppend('td', tr, { text: text });
      }
    }
  }

  function move() {
    let x = robot.x;
    let y = robot.y;

    switch (robot.dir) {
      case 'up':
        y = Math.min(board.length - 1, y + 1);
        break;
      case 'down':
        y = Math.max(0, y - 1);
        break;
      case 'left':
        x = Math.max(0, x - 1);
        break;
      case 'right':
        x = Math.min(board[y].length - 1, x + 1);
        break;
    }

    const cell = board[y][x];

    if (cell === '.' || cell === 'F' || cell === 'A') {
      board[robot.y][robot.x] = trailIndicators[robot.dir];
      robot.x = x;
      robot.y = y;
      if (cell === 'F') {
        console.log(`flag reached in ${moves} moves and ${turns} turns`);
        if (applesEaten > 0) {
          console.log('total apples eaten: ' + applesEaten);
        }
      } else if (cell === 'A') {
        applesEaten += 1;
        console.log('apple eaten: YUM');
      }
    } else {
      console.log('move blocked by obstacle');
    }

    moves += 1;
    renderBoard();
  }

  function turn(turnDirection) {
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

    switch (robot.dir) {
      case 'up':
        robot.dir = isLeftTurn ? 'left' : 'right';
        break;
      case 'down':
        robot.dir = isLeftTurn ? 'right' : 'left';
        break;
      case 'left':
        robot.dir = isLeftTurn ? 'down' : 'up';
        break;
      case 'right':
        robot.dir = isLeftTurn ? 'up' : 'down';
        break;
    }

    turns += 1;
    renderBoard();
  }

  function main() {
    board.reverse();
    const root = document.getElementById('root');
    renderToolbar(root);
    renderBoardContainer(root);
    renderBoard();
  }

  window.onload = main;
}
