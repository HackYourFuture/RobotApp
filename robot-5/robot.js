// eslint-disable-next-line no-var, no-unused-vars
var Robot = {};

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
  let flagReached = false;
  let applesEaten = 0;

  const imageMap = {
    T: 'tree.png',
    W: 'water.png',
    F: 'goal.png',
    R: 'robot.png',
    A: 'apple.png',
    K: 'key.png',
    L: 'lock.png'
  };

  function renderAll() {
    board.reverse();
    const root = document.getElementById('root');
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
    turnLeftButton.addEventListener('click', () => {
      console.log('button pressed: TURN-LEFT');
      turn('left');
    });
    toolbar.appendChild(turnLeftButton);

    const moveButton = document.createElement('button');
    moveButton.innerHTML = 'MOVE';
    moveButton.addEventListener('click', () => {
      console.log('button pressed: MOVE');
      move();
    });
    toolbar.appendChild(moveButton);

    const turnRightButton = document.createElement('button');
    turnRightButton.innerHTML = 'TURN-RIGHT';
    turnRightButton.addEventListener('click', () => {
      console.log('button pressed: TURN-RIGHT');
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
    const elem = document.getElementById('board');
    elem.innerHTML = '';

    const table = document.createElement('table');
    elem.appendChild(table);
    for (let row = board.length - 1; row >= 0; row--) {
      const cells = board[row];
      const tr = document.createElement('tr');
      table.appendChild(tr);
      let rowHtml = '';
      for (let col = 0; col < cells.length; col++) {
        const cell = cells[col];
        const img = imageMap[cell];
        let className = '';
        if (cell === 'R') {
          className = robot.dir;
          if (flagReached) {
            className += ' at-flag';
          }
        }
        const imgHtml = img ? `<img src="img/${img}" width="35" height="35">` : '';
        rowHtml += `<td class="${className}">${imgHtml}</td>`;
      }
      tr.innerHTML = rowHtml;
    }
  }

  function move() {
    flagReached = false;
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
      moves += 1;
      board[robot.y][robot.x] = '.';
      robot.x = x;
      robot.y = y;
      board[y][x] = 'R';
      if (cell === 'F') {
        flagReached = true;
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

    renderBoard();
  }

  function turn(turnDirection) {
    if (turnDirection !== 'left' && turnDirection !== 'right') {
      console.log('ignoring invalid turn', turnDirection);
      return;
    }

    turns += 1;

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

    renderBoard();
  }

  function execute(command) {
    console.log('execute: ' + command);
    switch (command) {
      case 'MOVE':
        move();
        break;
      case 'TURN-LEFT':
        turn('left');
        break;
      case 'TURN-RIGHT':
        turn('right');
        break;
      default:
        this.log('ignoring unexpected command:', command);
    }
  }

  function executeSequence(commands) {
    const queue = commands.slice();
    if (queue.length === 0) {
      return;
    }

    const intervalID = setInterval(() => {
      const command = queue.shift();
      execute(command);
      if (queue.length === 0) {
        clearInterval(intervalID);
      }
    }, 750);
  }


  renderAll();

  Robot.executeSequence = executeSequence;

})();
