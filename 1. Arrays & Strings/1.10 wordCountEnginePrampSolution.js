/*

Question 1.10 - Word Count Engine - from PRAMP:

R(ephrase): 
- count & rank words from a "document" (long string) regardless of case & internal punctuation
- return them in an array from most->least frequently occurring
- if tied for # of occurrences, return in the order they appeared as you came across them

E(xample): 
	Input:
    "PrActICE makeS; perfect! so Practice", 
	Output:
	  [['practice', '2'],['makes', '1'],['perfect', '1'],['so', '1']]

A(pproach): 
- see comments within the function

C(ode):

*/

let doc1 = "Hello, i'm Kate!!!!";
let doc2 =
  "Practice makes perfect. you'll only get Perfect by practice. just practice!";
let doc3 =
  'Every book is a quotation; and every house is a quotation out of all forests, and mines, and stone quarries; and every man is a quotation from all his ancestors. ';

function wordCountEngine(document) {
  let largestCount = 0;
  let hash = {};
  let wordList = document.split(' ');
  // for loop for checking/cleaning each word
  for (let i = 0; i < wordList.length; i++) {
    let cleanWord = '';
    let word = wordList[i];
    let charArray = [];
    // for loop for checking/cleaning each character
    for (let j = 0; j < word.length; j++) {
      let ch = word[j].toLowerCase();
      // pramp solution thinks this will work well enough but...
      if (ch >= 'a' && ch <= 'z') {
        charArray.push(ch);
      }
      cleanWord = charArray.join('');
      // it actually needs to be cleaned with this regex to pass all test cases lol...
      cleanWord = cleanWord.replace(/[^\w\s]|_/g, '');
      // skip the word (don't add to hash) if it is less than 1 character long
      if (cleanWord.length < 1) {
        continue;
      }
    }
    // when we add to hash, it will be in "cleanWord": # format, if there increase #
    if (hash[cleanWord]) {
      hash[cleanWord]++;
      // if not already in hash, initialize value to 1
    } else {
      hash[cleanWord] = 1;
    }
    // check on our counter by comparing value at cleanWord to running largestCount
    if (hash[cleanWord] > largestCount) {
      // reassign accordingly
      largestCount = hash[cleanWord];
    }
  }
  // it was helpful to check your hash and largestCount at this point:
  // console.log("hash: ", hash);
  // console.log("largestCount: ", largestCount);

  // now we will use a sort of 'bucket sort'ish method
  // set up an empty array that will have a length of largestCounter+1
  let counterList = new Array(largestCount + 1);
  // fill this empty list with empty []
  for (let i = 0; i < counterList.length; i++) {
    counterList[i] = [];
  }
  // now check every key in the hash...
  for (let key in hash) {
    // we want to push something like ['cleanWord', '#'] into the index that matches the count for a word
    counterList[hash[key]].push([key, hash[key].toString()]);
  }
  // now is a good time to check out counterList to make sure it has everything you expected
  // console.log("counterList: ", counterList);

  // let's reverse the list because we eventually want order to be most frequent -> less frequent
  let rev = counterList.reverse();

  let output = [];
  // run thru reversed counterList to flatten it and then push into the output array
  for (let i = 0; i < rev.length; i++) {
    let set = rev[i];
    if (Array.isArray(set)) {
      set.forEach((pair) => {
        output.push(pair);
      });
    }
  }
  // now all words should be listed from most to least frequent && in the order they first appeared
  return output;
}

// T(est):
console.log('doc1 result: ', wordCountEngine(doc1));
console.log('doc2 result: ', wordCountEngine(doc2));
console.log('doc3 result: ', wordCountEngine(doc3));

// O(ptimize):
// despite there being a set of nested for loops,
// this is still in O(N) time where N is the number of characters in the string
// this method is not terribly optimal for space usage as we let many placeholder arrays during editing
