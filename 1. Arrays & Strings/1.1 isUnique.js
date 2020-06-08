// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 1.1 - Is Unique: 
Implement an algorithm to determine if a string has all unique characters. 
What if you cannot use additional data structures? 

*/

// this version takes O(N) time, and takes O(N) extra space
const isUnique = (str) => {
  let hash = {};
  for (let i = 0; i < str.length; i++) {
    hash[str[i]] = str[i];
  }
  // console.log(hash); // did this just to self-check that hash table is doing what I expected
  let hashLength = Object.values(hash).length;
  let strLength = str.length;
  if (hashLength !== strLength) return false;
  else return true;
};

console.log('isUnique "heya": ', isUnique('heya'));
console.log('isUnique "hey you": ', isUnique('hey you'));
//
//
//
//
//
// this version takes O(N^2) time, and Constant/Zero extra space
const izUnique = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] == str[j]) {
        return false;
      }
    }
  }
  return true;
};

console.log('izUnique "heya": ', izUnique('heya'));
console.log('izUnique "hey you": ', izUnique('hey you'));
//
//
//
//
//
/*
  Solution v1 from CtCI:
    Keep track of seen characters with a Set data structure, 
    fail when a repeated character is found.
 
    Time: O(N)
    Additional space: O(N)
 */
function hasUniqueCharactersSet(str) {
  let chars = new Set();

  for (let i = 0; i < str.length; ++i) {
    if (chars.has(str[i])) {
      return false;
    }
    chars.add(str[i]);
  }
  return true;
}

console.log('set version "heya": ', hasUniqueCharactersSet('heya'));
console.log('set version "hey you": ', hasUniqueCharactersSet('hey you'));

/*
  Solution v2 from CtCI
    Sort the original string first then iterate through it. 
		Repeat characters will show up next to each other 
		so fails if any two characters in a row are the same.

    Time: O(N log N)
    Additional space: O(1)
 */

function hasUniqueCharactersSort(str) {
  // sort string using quicksort
  str.sort();

  for (var i = 1; i < str.length; ++i) {
    if (str[i] === str[i - 1]) {
      return false;
    }
  }
  return true;
}

console.log('sort version "heya": ', hasUniqueCharactersSort('heya'));
console.log('sort version "hey you": ', hasUniqueCharactersSort('hey you'));

//==============================================================================
