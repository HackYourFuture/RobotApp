(function () {
  'use strict';

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

  function renderAll() {
    board.reverse();
    const root = document.getElementById('root');
    root.innerHTML = '';
    renderToolbar(root);
    renderBoardContainer(root);
    renderBoard();
  }

  function renderToolbar(root) {
    const toolbar = document.createElement('div');
    root.appendChild(toolbar);
    toolbar.setAttribute('id', 'toolbar');

    const turnLeftButton = document.createElement('button');
    turnLeftButton.innerHTML = 'TURN-LEFT';
    turnLeftButton.addEventListener('click', function () {
      turn('left');
    });
    toolbar.appendChild(turnLeftButton);

    const moveButton = document.createElement('button');
    moveButton.innerHTML = 'MOVE';
    moveButton.addEventListener('click', function () {
      move();
    });
    toolbar.appendChild(moveButton);

    const turnRightButton = document.createElement('button');
    turnRightButton.innerHTML = 'TURN-RIGHT';
    turnRightButton.addEventListener('click', function () {
      turn('right');
    });
    toolbar.appendChild(turnRightButton);
  }

  function renderBoardContainer(root) {
    const board = document.createElement('div');
    board.setAttribute('id', 'board');
    root.appendChild(board);
  }

  function renderBoard() {
    console.log('rendering');
    const elem = document.getElementById('board');
    elem.innerHTML = '';

    board[robot.y][robot.x] = 'R' + trailIndicators[robot.dir];

    const table = document.createElement('table');
    elem.appendChild(table);
    for (let row = board.length - 1; row >= 0; row--) {
      const cells = board[row];
      const tr = document.createElement('tr');
      table.appendChild(tr);
      let rowHtml = '';
      for (let col = 0; col < cells.length; col++) {
        const cell = cells[col] === '.' ? '' : cells[col];
        rowHtml += `<td>${cell}</td>`;
      }
      tr.innerHTML = rowHtml;
    }
  }

  function move() {
    console.log('executing move()');
    let x = robot.x;
    let y = robot.y;

    switch (robot.dir) {
      case 'up':
        y = y < board.length - 1 ? y + 1 : y;
        break;
      case 'down':
        y = y > 0 ? y - 1 : y;
        break;
      case 'left':
        x = x > 0 ? x - 1 : x;
        break;
      case 'right':
        x = x < board[0].length - 1 ? x + 1 : x;
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
    if (turnDirection !== 'left' && turnDirection !== 'right') {
      console.log('ignoring invalid turn', turnDirection);
      return;
    }

    console.log('executing turn()');

    switch (robot.dir) {
      case 'up':
        robot.dir = turnDirection === 'left' ? 'left' : 'right';
        break;
      case 'down':
        robot.dir = turnDirection === 'left' ? 'right' : 'left';
        break;
      case 'left':
        robot.dir = turnDirection === 'left' ? 'down' : 'up';
        break;
      case 'right':
        robot.dir = turnDirection === 'left' ? 'up' : 'down';
        break;
    }

    turns += 1;
    renderBoard();
  }

  renderAll();
})();
