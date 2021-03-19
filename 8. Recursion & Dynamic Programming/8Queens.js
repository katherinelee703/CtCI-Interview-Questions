/*

8 QUEENS PROBLEM:

Write an algorithm to print all ways of arranging 
eight queens on an 8x8 chess board so that 
none of them share the same row, column, or diagonal. 
In this case, "diagonal" means all diagonals, 
not just the two that bisect the board.

*/
let q = 'q';
let emptyBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

function nQueens(boardSize) {
  let columns = [];
  columns.length = boardSize;
  columns.fill(null);
  placeQueens(boardSize, columns, 0, (results = []));
  console.log('num of boards you can make: ', results.length);
  return results;
}

function placeQueens(boardSize, columns, row, results) {
  if (row === boardSize) {
    // valid board placements have been set, add to results
    results.push(columns.slice());
  } else {
    for (let col = 0; col < boardSize; col++) {
      if (checkValid(columns, row, col)) {
        columns[row] = col; // placing queen will only happen once per row at a valid column only
        placeQueens(boardSize, columns, row + 1, results); // calls on next row until we have 1 queen per row, or can't place any more queens due to restrictions
      }
    }
  }
}

function checkValid(columns, row, col) {
  for (let priorRow = 0; priorRow < row; priorRow++) {
    // check if row2 col2 invalidates row1 col1 as a queen spot
    // check if rows have a queen in the same column
    let otherColumn = columns[priorRow];
    if (columns[priorRow] === col) return false;

    // check diagonals from here on:
    let columnDistance = Math.abs(col - otherColumn); // or columsn[priorRow]
    let rowDistance = row - priorRow; // always row > otherRow, so no need for Math.abs
    // if distance bw columns === distance bw rows, they're in same diagonal
    if (columnDistance === rowDistance) return false;
  }
  return true;
}

// observe that since each row can only have 1 queen, we don't need to store board as 2d array/ 8x8 matrix.
// we only need a single array where column[r] = c indicates that row r has a queen in column c.

// for example, the array [0,1,2,3,4,5,6,7] shows a board where there are queens going along the diagonal
// from top left to bottom right. (q @ 0,0  -  q @ 1,1  -  q @ 2,2  -  etc...)

console.log('4q all: ', nQueens(4));
console.log('8q all: ', nQueens(8));
