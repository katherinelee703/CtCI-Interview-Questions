// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 1.9 - String Rotation:

Assume you have a method isSubstring that checks if one word is a substring of another. 
Given 2 strings, s1 and s2, write code to check if s2 is a rotation of s1 using only ONE call to isSubstring.
(e.g. "waterbottle" is a rotation of "erbottlewat")

R(ephrase): 
  Making 1 call to isSubstring, see if s2 is a rotation of s1

E(xamples): 
  returns true: "tieka" is a rotation of "katie"
  returns false: "tieca" or "tieak" is NOT a rotation of "katie"

A(pproach) 1: 
-> isRotation can only return true if the call made to isSubstring returns true (+ other conditions?)
-> if isSubstring returns true, find point at which substring starts (must be index 0 or isn't rotation)
-> then compare remaining letters at end of s2 to s1's same number of letters from the beginning
-> the remaining characters will follow the same order in a true rotation, so no need for additional call

A(pproach) 2:
-> isRotation can only return true if the call made to isSubstring returns true (+ other conditions?) 
-> no need to determine WHERE the substring is, simply know whether it exists
-> put s1 + s1 end to end -> "katiekatie" because any possible rotation in any position would occur within that
-> 1 call to isSubstring will then "katiekatie" and s2 to see if it includes "tieka"

C(ode):

*/

// Using Correct Method (first attempt saved below):

function isSubstring(str, substr) {
  return str.includes(substr);
}

function isRotation(str1, str2) {
  // Optimized here
  if (!str1 || !str2) {
    throw new Error('invalid input');
  }
  // Optimized here too
  if (str1.length !== str2.length) {
    return false;
  }
  // basically a 1-line solution
  return isSubstring(str1 + str1, str2);
}

// T(est):

// This solution is in O(N) time due to .includes() method

console.log('example 1: ', isRotation('erbottlewat', 'waterbottle')); // true;
console.log('is rotation 1: ', isRotation('tieka', 'katie')); // true;
console.log('is rotation 2: ', isRotation('tieak', 'katie')); // false;
console.log('is rotation 3: ', isRotation('tiekaa', 'katie')); // false
console.log('is rotation 4: ', isRotation('tieca', 'katie')); // false;

//=============================================================================================

// First Attempt: Brute Force - missed the meaning of "one call to isSubstring"
// this makes one call PER iteration so was not the correct method, but oh well, it still works!

// const isSubstring = (strA, strB) => {
//   return strA.includes(strB);
// }

// console.log("checking isSubstring: ", isSubstring("katie", "tie")); // expect true;

// const isRotation = (s1, s2) => {
//   if (!s1 || !s2) {
//     throw new Error('invalid input');
//   }
//   if (s1.length !== s2.length) {
//     return false;
//   }
//   let runningSlice;
//   for (let i = s1.length; i >= 0; i--) {
//     runningSlice = s2.slice(0, i); // whole of s2;
//     let isSub = isSubstring(s1, runningSlice);
//     if (isSub) { // is truthy;
//       if (s2.slice(i) === s1.slice(0, s1.length-i)) {
//         return true;
//       }
//     }

//   }
//   return false;
// }
