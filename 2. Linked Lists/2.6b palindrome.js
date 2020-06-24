// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 2.6b - Is a Singly Linked List a Palindrome:

R(ephrase): in a SLL where each node's value is a letter in a word, check whether the word is a palindrome or not

E(xamples):
  Input:
          |t|->|a|->|c|->|o|->|c|->|a|->|t|->|NULL| 
  
  Check each item against the reverse:
  |NULL|<-|t|<-|a|<-|c|<-|o|<-|c|<-|a|<-|t|

  Output: true

A(pproach):
-> set a var reverseCopy to a new, empty SLL
-> in a while loop make a copy of original list into reverseCopy, but copy it in reverse using "append" method instead of "prepend" method
-> make sure current goes back to original list's head, and copy current is reverse copy's head
-> while loop again and check that current vals are matching set
  -if not, return false immediately
  -if loop completes, return true

C(ode): (NOTE: the following code is case sensitive)

*/
class SinglyLinkedList {
  constructor() {
    this.head = this.tail = null;
  }
  // adds node to end
  append(value) {
    // if list is empty
    if (!this.tail) {
      this.head = this.tail = new Node(value);
    } else {
      let oldTail = this.tail;
      this.tail = new Node(value);
      oldTail.next = this.tail;
    }
  }
  // adds node to beginning
  prepend(value) {
    // if list is empty
    if (!this.head) {
      this.head = this.tail = new Node(value);
    } else {
      let oldHead = this.head;
      this.head = new Node(value);
      this.head.next = oldHead;
    }
  }
}

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function isPalindrome(list) {
  // Optimize:
  if (!list.head) {
    throw new Error('input is an empty list');
  }
  if (!list.head.next) {
    return true;
  }
  let reverseCopy = new SinglyLinkedList();
  let current = list.head;
  let counter = 1;

  while (current) {
    reverseCopy.prepend(current.value);
    current = current.next;
    ++counter;
  }

  let halfway = Math.floor(counter / 2);
  let newCounter = 1;
  current = list.head;
  copyCurrent = reverseCopy.head;

  while (newCounter <= halfway) {
    if (current.value !== copyCurrent.value) {
      return false;
    }
    ++newCounter;
    current = current.next;
    copyCurrent = copyCurrent.next;
  }

  return true;
}

// T(est):

let myList = new SinglyLinkedList();

myList.append('t');
myList.append('a');
myList.append('c');
myList.append('o');
myList.append('c');
myList.append('a');
myList.append('t');

let myList2 = new SinglyLinkedList();

myList2.append('h');
myList2.append('a');
myList2.append('n');
myList2.append('n');
myList2.append('a');
myList2.append('h');

let myList3 = new SinglyLinkedList();

myList3.append('h');
myList3.append('a');
myList3.append('n');
myList3.append('n');
myList3.append('a');
myList3.append('h');
myList3.append('h');

let myList4 = new SinglyLinkedList();

myList4.append('K');

let myList5 = new SinglyLinkedList();

console.log('myList1: ', isPalindrome(myList)); // expect true
console.log('myList2: ', isPalindrome(myList2)); // expect true
console.log('myList3: ', isPalindrome(myList3)); // expect false
console.log('myList4: ', isPalindrome(myList4)); // expect true
console.log('myList5: ', isPalindrome(myList5)); // expect error

// O(ptimize):
// see lines 67 - 73, 84, 85, 89
// O(N) time, O(N) space, where N is the total number of nodes
