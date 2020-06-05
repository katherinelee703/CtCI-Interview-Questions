// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 1.8 - Zero Matrix:

Write an algorithm such that if an element in an M x N matrix is a 0, its entire row and column are set to 0.


R(ephrase): 
  Any time you find a 0 in the matrix, 
  convert its whole ROW & COLUMN to all 0s

E(xamples): 

  This: 
  [
    [5,5,5,5],
    [5,0,5,5],
    [5,5,5,5]
  ]

  Would become this:
  [
    [5,0,5,5],
    [0,0,0,0],
    [5,0,5,5]
  ]

  OR

  This:
  [
    [5,0,5],
    [0,5,5],
  ]

  Would become this:
  [
    [0,0,0],
    [0,0,0]
  ]

  2 Things we can infer:
    If there is a 0 in every ROW, the whole matrix will become 0s
    If there is a 0 in every COLUMN, the whole matrix will become 0s



A(pproach) 1: 

* Avoids mutating original matrix - requires O(N) additional storage

-start looping thru each row (i loop) - 
  -set a tracker for row 0s
  -set a tracker for column 0s
  -iterate through the 2D array/matrix (2 for loops, i & j)
  -if zero is found, then 
    -add the i to the row tracker
    -add the j to the column tracker
  -let a new matrix and start copying over original values (2 for loops)
    -if the i is included in the row tracker, whole row is set to 0s
    -finish iterating
  -read thru the matrix (2 for loops)
    -if the j is included in column tracker, whole column is set to 0s
    -finish iterating
  -return new matrix



C(ode):

*/

// Version that avoids mutating the original matrix
function zeroMatrix(m) {
  let zrows = [];
  let zcols = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      if (m[i][j] === 0) {
        if (!zrows.includes(i)) {
          zrows.push(i);
        }
        if (!zcols.includes(j)) {
          zcols.push(j);
        }
      }
    }
  }
  let zMatrix = [];
  for (let i = 0; i < m.length; i++) {
    let row = [];
    for (let j = 0; j < m[0].length; j++) {
      if (zrows.includes(i)) {
        row.push(0);
      } else if (zcols.includes(j)) {
        row.push(0);
      } else {
        row.push(m[i][j]);
      }
    }
    zMatrix.push(row);
  }
  return zMatrix;
}

// Version that mutates the original matrix
function zeroMatrixx(m) {
  let zrows = [];
  let zcols = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      if (m[i][j] === 0) {
        if (!zrows.includes(i)) {
          zrows.push(i);
        }
        if (!zcols.includes(j)) {
          zcols.push(j);
        }
      }
    }
  }
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      if (zrows.includes(i)) {
        m[i][j] = 0;
      } else if (zcols.includes(j)) {
        m[i][j] = 0;
      }
    }
  }
  return m;
}

// T(est):

let test1 = [
  [5, 5, 5, 0],
  [5, 5, 5, 5],
  [0, 5, 5, 5],
];

let test2 = [
  [5, 0, 5],
  [0, 5, 5],
];

let test3 = [
  [0, 3, 3, 3, 0],
  [3, 3, 3, 3, 3],
];

let test4 = [
  [4, 0, 4, 0],
  [4, 4, 4, 4],
  [4, 4, 4, 4],
  [4, 4, 0, 4],
];

console.log('test   1: ', zeroMatrix(test1));
console.log('test   2: ', zeroMatrix(test2));
console.log('test   3: ', zeroMatrix(test3));
console.log('test   4: ', zeroMatrix(test4));

console.log('zeroMatrixx 1: ', zeroMatrixx(test1));
console.log('zeroMatrixx 2: ', zeroMatrixx(test2));
console.log('zeroMatrixx 3: ', zeroMatrixx(test3));
console.log('zeroMatrixx 4: ', zeroMatrixx(test4));

// O(ptimize):

/* 

Space Trade-off
  -I could mutate the original matrix in order to not use any extra memory
  -Or I could preserve the original matrix by using O(N) extra memory to make a separate, updated matrix

*/
