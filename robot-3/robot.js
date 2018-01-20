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

  function renderBoard() {
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

  board[robot.y][robot.x] = 'R' + trailIndicators[robot.dir];

  const table = document.createElement('table');
  root.appendChild(table);
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

    renderBoard();
  }

  function turn(turnDirection) {
    if (turnDirection !== 'left' && turnDirection !== 'right') {
      console.log('ignoring invalid turn', turnDirection);
      return;
    }

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

  board.reverse();

  renderBoard();

  // start of robot commands
  move();
  turn('right');
  move();
  move();
  move();
  turn('left');
  move();
  move();
  // end of robot commands

}
