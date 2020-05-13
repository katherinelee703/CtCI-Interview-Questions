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

//==============================================================================

/*

Question 1.2 - Check Permutation: 
Given two strings, write a method to decide if one is a permutation of the other.

*/

const isPermutation = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  let hash = {};
  for (let i = 0; i < str1.length; i++) {
    // make hash table out of str1
    let currentLetter = str1[i];
    if (hash[currentLetter]) {
      // current letter exists as a key
      hash[currentLetter] += 1; // add 1 to the value at that key
    } else {
      // does not yet exist as a key
      hash[currentLetter] = 1; // create key and set value to 1
    }
  }
  for (let j = 0; j < str2.length; j++) {
    // check str2 against items in hash table
    let currentLetter = str2[j];
    if (hash[currentLetter] !== 0) {
      // if counter isn't at 0 yet, can use str2's letter to rebuild str1
      hash[currentLetter]--; // minus 1 after each use of that letter
    } else {
      return false; // either current letter doesn't exist or value is at 0, ∴ is NOT a Permutation
    }
  }
  return true; // loops finished, was able to rebuild str1 using str2 ∴ is a Permutation
};

// this takes O(N) time, and O(N) extra space due to the hash table
console.log('isPerm "catt" & "tacc": ', isPermutation('catt', 'catc')); //false
console.log('isPerm "catt" & "ttac": ', isPermutation('catt', 'ttac')); //true

//==============================================================================
