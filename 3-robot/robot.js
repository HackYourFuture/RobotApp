'use strict';
{
  const board = [
    ['T', 'T', '.', 'F'],
    ['T', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['R', '.', '.', 'W']
  ];

  function main() {
    const root = document.getElementById('root');
    root.innerHTML = '';
    const table = document.createElement('table');
    root.appendChild(table);

    for (let row = 0; row < board.length; row++) {
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

  window.onload = main;
}
