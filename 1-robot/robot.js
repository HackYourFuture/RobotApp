'use strict';
{
  // 
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

  /**
   * Moves the robot one step in its current direction (up, down, left or right).
   */
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
    }

    moves += 1;
    renderBoard();
  }

  function turn(turnDirection) {
    if (turnDirection !== 'left' && turnDirection !== 'right') {
      console.log('ignoring invalid turn', turnDirection);
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
  }

  function steps() {
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
    renderBoard();
    steps();
  }

  main();
}
