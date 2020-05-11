// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/

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
