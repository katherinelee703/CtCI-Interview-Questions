// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 1.7 - Rotate Matrix:

Given an Image represented by an N x N matrix, where each pixel in the image is 4 bytes,
write a method to rotate the image by 90 degrees.
* Can you do this "in place"?

R(ephrase): rotate a square image - perfect squares CAN be rotated "in place" 

E(xample): see line 23...

A(approach): 1st brute force (rotateMatrix) - then "in place" (inPlaceRotateMatrix) swapping corners method

C(ode): 

*/

let original = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

/* want this one on 1st try
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]

want this one on 2nd try
[
  [9,8,7],
  [6,5,4],
  [3,2,1]
]

want this one on 3rd try
[
  [3,6,9],
  [2,5,8],
  [1,4,7]
]

want this one (the original again) on 4th try
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
*/

// BRUTE FORCE VERSION:
function rotateMatrix(matrix) {
  let final = [];
  let innerRow = [];
  let row = matrix.length - 1;
  let el = 0;
  for (let i = 0; i < matrix.length; i++) {
    while (row >= 0) {
      innerRow.push(matrix[row][el]);
      row--;
    }
    final.push(innerRow);
    innerRow = [];
    row = matrix.length - 1;
    el++;
  }
  return final;
}

// T(est):
const try1 = rotateMatrix(original);
const try2 = rotateMatrix(try1);
const try3 = rotateMatrix(try2);
const try4 = rotateMatrix(try3);

// this is O(n^2) time, and O(N) space
console.log('rotate THIS by 90°: ', original);
console.log('rotate 1st try: ', try1);
console.log('rotate 2nd try: ', try2);
console.log('rotate 3rd try: ', try3);
console.log('rotate 4th try: ', try4);

//=========================================================================

// IN PLACE VERSION:
function inPlaceRotateMatrix(m) {
  // O(ptimized) this after solving:
  if (!m || m.length === 0 || m.length !== m[0].length) {
    throw new Error('invalid matrix');
    // it either doesn't exist, is empty, or is not a square (N x N shape)
  }
  if (m.length < 2) {
    return m;
    // no need to do anything to rotate a 1 x 1 matrix
  }
  //
  for (let i = 0; i < Math.floor(m.length / 2); i++) {
    for (let j = 0; j < m.length - 2 * i - 1; j++) {
      // swapping corners method here... see line 124...
      let temp = m[i + j][m.length - 1 - i]; // temp = b
      m[i + j][m.length - 1 - i] = m[i][i + j]; // b = a
      m[i][i + j] = temp; // a = temp

      temp = m[m.length - 1 - i][m.length - 1 - i - j]; // temp = c
      m[m.length - 1 - i][m.length - 1 - i - j] = m[i][i + j]; // c = a
      m[i][i + j] = temp; // a = temp

      temp = m[m.length - 1 - i - j][i]; // temp = d
      m[m.length - 1 - i - j][i] = m[i][i + j]; // d = a
      m[i][i + j] = temp; // a = temp
    }
  }
  return m;
}

/*
How to notate the swappable "corners": 

A: m[i][i+j]
B: m[i+j][m.length-1-i]
C: m[m.length-1-i][m.length-1-i-j]
D: m[m.length-1-i-j][i]

 A             B
  \           /
   <1>  2  <3>                B becomes A's value. B is stored at A.
                              
    4   5   6                 C becomes A's value. C is stored at A.

   <7>  8  <9>                D becomes A's value. D is stored at A.
  /           \
 D             C              Now all corners have been swapped. Iterate.


*/

// T(est):

console.log('rotate THIS in place by 90°: ', original);
const tryA = inPlaceRotateMatrix(original);

console.log('rotate in place 1st try: ', tryA);
const tryB = inPlaceRotateMatrix(tryA);

console.log('rotate in place 2nd try: ', tryB);
const tryC = inPlaceRotateMatrix(tryB);

console.log('rotate in place 3rd try: ', tryC);
const tryD = inPlaceRotateMatrix(tryC);

console.log('rotate in place 4th try: ', tryD);
// it is now back to the original matrix

//=========================================================================
