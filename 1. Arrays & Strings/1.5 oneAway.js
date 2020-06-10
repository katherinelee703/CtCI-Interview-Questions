// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 1.5 - One Away: 

There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. 
Given two strings, write a function to check if they are one edit (or zero edits) away.

R(ephrase): make sure the 2 strings are only different by one or zero edits

E(xample):
pale, ple -> true
pales, pale -> true
pale, bale -> true
pale, bake -> false

A(pproach):
-> will be case sensitive if we do not set the input strings to .toLowerCase()
-> can immediately fail when the 2 input strings' lengths are different by more than 1 letter
-> set an isEdited marker variable to false to start with
-> can check each string letter by letter
	-> at first set of letters, they will either be the same or different
		if same: iterate to next set
		if different:
		-> before next iteration, if strings are diff lengths:
		  -> set i or j (shorter string) back by one so it can be checked once more against next character
		  -> if lengths are same, do nothing with i and j
		  -> now set isEdited marker to true 
	-> check next set, if different again, check to see if marker is true, if so then fail, else move on to next letter set
	-> if iteration makes it to the end of the strings (pass), the strings are either the same or have only been edited by one letter

*/

// C(ode):

function oneAway(str1, str2) {
  // Optimized
  if (!str1 || !str2) {
    throw new Error('invalid input');
  }
  // Optimized
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw new Error('inputs must be strings');
  }
  // if lengths differ by more than 1 then can't be true
  if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  }

  let isEdited = false;
  for (let i = 0, j = 0; i < str1.length && j < str2.length; i++, j++) {
    if (str1[i] !== str2[j]) {
      if (isEdited) {
        // second edit
        return false;
      }

      if (str1.length > str2.length) {
        j--; // decrease j, we are deleting char from str1
      } else if (str1.length < str2.length) {
        i--; // decrease i, we are deleting char from str2
      }
      isEdited = true;
    }
  }

  return true;
}

// T(est):

console.log(oneAway('cat', 'catt')); // true
console.log(oneAway('cat', 'cat')); // true - zero edits allowed to pass
console.log(oneAway('cat', 'Cat')); // true - because case sensitive
console.log(oneAway('cat', 'Catt')); // false - because case sensitive
console.log(oneAway('pale', 'ple')); // true
console.log(oneAway('pales', 'pale')); // true
console.log(oneAway('pale', 'bale')); // true
console.log(oneAway('pale', 'bake')); // false - 2 letters changed
// console.log(oneAway([], [])); // error - inputs are not strings
// console.log(oneAway("", "")); // error - empty strings are falsey
// console.log(oneAway(null, null)); // error - invalid input
// console.log(oneAway("hi", null)); // error - invalid input

// O(ptimize): lines 40 - 47
