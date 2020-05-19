// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 1.4 - Palindrome Permutation: 

Given a string, write a function to check if it is a permutation of a palindrome.
A palindrome is a word or phrase that is the same forwards and backwards. 
A permutation is a rearrangement of letters. 
The palindrome does not need to be limited to just dictionary words.

EXAMPLE
Input: Tact Coa
Output: True (permutations: "taco cat". "atco cta". etc.)

*/

const palPerm = (str) => {
  let lowStr = str.toLowerCase();
  if (str.length < 2) return true; // below code does this anyway, but this line could optimize speed.
  let hash = {};
  for (let i = 0; i < lowStr.length; i++) {
    let char = lowStr[i];
    if (hash[char]) {
      hash[char]++;
    } else {
      hash[char] = 1;
    }
  }
  let vals = Object.values(hash);
  let onesCounter = 0;
  let oddValsCounter = 0;
  for (let j = 0; j < vals.length; j++) {
    //n
    let el = vals[j];
    if (el === 1) {
      onesCounter++;
    }
    if (el % 2 !== 0) {
      oddValsCounter++;
    }
  }
  if (onesCounter > 1 || oddValsCounter > 1) {
    return false;
  } else {
    return true;
  }
};

// thanks to hash table this runs at O(n) time, O(n) space
console.log('palPerm1: ', palPerm('KaaaeeeK')); // f
console.log('palPerm2: ', palPerm('KaaaTeeeK')); // f
console.log('palPerm3: ', palPerm('KaTeeeK')); // f
console.log('palPerm4: ', palPerm('KaTteek')); // t
console.log('palPerm5: ', palPerm('TacoCat')); // t
console.log('palPerm6: ', palPerm('K')); // t, 1 letter words are technically palindromes
console.log('palPerm7: ', palPerm('')); // t, empty strings are technically palindromes

//==============================================================================
