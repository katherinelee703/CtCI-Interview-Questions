// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 1.3 - URLify: 

Write a method to replace all spaces in a string with '%20'. 
You may assume that the string has sufficient space at the end to hold the additional characters, 
and that you are given the "true" length of the string. 
(Note: If implementing in Java, please use a character array so that you can perform this operation in place.)

EXAMPLE
Input: "Mr John Smith    ", 13
Output: "Mr%20John%20Smith"

*/

// brute force, not caring about the case when someone puts random extra spaces at the end
const urlify = (str) => {
  let final = str.split(' ').join('%20');
  return final;
};

// OR, considering the case when people left extra spaces at the end

const urlIFY = (str, origLen) => {
  let final = '';
  for (let i = 0; i < origLen; i++) {
    if (str[i] === ' ') {
      final += '%20';
    } else {
      final += str[i];
    }
  }
  return final;
};

console.log('urlify: ', urlify('Kate Lee'));
console.log('urlIFY: ', urlIFY('Kate Lee  ', 8));

//==============================================================================
