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
  let flagReached = false;

  const trailIndicators = {
    left: '←',
    right: '→',
    up: '↑',
    down: '↓'
  };

  function render() {
    renderText();
    renderHtml();
  }

  function renderText() {
    console.log('\n ' + moves + ':');

    board[robot.y][robot.x] = 'R';

    for (let row = board.length - 1; row >= 0; row--) {
      const cells = board[row];
      let line = '';
      for (let col = 0; col < cells.length; col++) {
        line += ' ' + cells[col] + ' ';
      }
      console.log(line);
    }

    if (flagReached) {
      console.log(`Flag reached in ${moves} moves and ${turns} turns`);
    }
  }

  function renderHtml() {
    const root = document.getElementById('root');
    root.innerHTML = '';
    const table = document.createElement('table');
    root.appendChild(table);
    for (let row = board.length - 1; row >= 0; row--) {
      const cells = board[row];
      const tr = document.createElement('tr');
      table.appendChild(tr);
      for (let col = 0; col < cells.length; col++) {
        const cell = cells[col] === '.' ? '' : cells[col];
        const td = document.createElement('td');
        tr.appendChild(td);
        td.innerText = cell;
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

    if (cell === '.' || cell === 'F') {
      board[robot.y][robot.x] = trailIndicators[robot.dir];
      robot.x = x;
      robot.y = y;
      if (cell === 'F') {
        flagReached = true;
      }
    } else {
      console.log('move blocked by obstacle');
    }

    moves += 1;
    render();
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
    render();
  }

  function run() {
    // start of robot game instructions
    move();
    turn('right');
    move();
    move();
    move();
    turn('left');
    move();
    move();
    // end of robot game instructions
  }

  function main() {
    board.reverse();
    render();
    run();
  }

  window.onload = main;
}
