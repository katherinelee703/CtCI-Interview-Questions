// Chapter 1: Arrays and Strings
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 1.6 - String Compression:

Implement a method to perform basic string compression using the counts of repeated characters.
For example, the string aaabccddddaabb would become a3b1c2d4a2b2.
If your "compressed" string is not any shorter than the original string, return the original string.
You can assume the string has only upper and lowercase letters from a - z.

*/

function compression(str) {
  if (!str) return str;
  let final = '';
  let current;
  let next;
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    current = str[i];
    next = str[i + 1];
    if (current === next) {
      count++;
    } else {
      final += current;
      final += count.toString();
      count = 1;
    }
  }
  return final.length >= str.length ? str : final;
}
// takes O(N) time, O(N) space
console.log('compression1: ', compression('helloooo'));
console.log('compression2: ', compression('hellOoooooo'));
console.log('compression3: ', compression(''));
