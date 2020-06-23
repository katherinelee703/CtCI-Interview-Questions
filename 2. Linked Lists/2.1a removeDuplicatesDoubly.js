// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 2.1 - Remove Duplicates:

Write code that removes duplicates from an unsorted linked list
Hints: #9, #40

R(ephrase): for this code I will choose to remove repeated items from an unsorted DOUBLY linked list

E(xamples):

Given this:

        | |->| |->| |->|  |->| |->| |->| |->|NULL|
        |5|  |5|  |1|  |12|  |3|  |5|  |1|
|NULL|<-| |<-| |<-| |<-|  |<-| |<-| |<-| |  
       (head)                         (tail)

Return this:

        | |->| |->|  |->| |->|NULL|
        |5|  |1|  |12|  |3|
|NULL|<-| |<-| |<-|  |<-| |  
       (head)          (tail)


A(pproach):

->

C(ode):

*/

// Will start by setting up my LinkedList class and Node class to use for testing:

class LinkedList {
  constructor() {
    this.head = this.tail = null;
  }
  // add to end
  append(value) {
    // if list is empty
    if (!this.tail) {
      this.head = this.tail = new Node(value);
    } else {
      let oldTail = this.tail;
      this.tail = new Node(value);
      oldTail.next = this.tail;
      this.tail.prev = oldTail;
    }
  }
  prepend(value) {
    // if list is empty
    if (!this.head) {
      this.head = this.tail = new Node(value);
    } else {
      let oldHead = this.head;
      this.head = new Node(value);
      oldHead.prev = this.head;
      this.head.next = oldHead;
    }
  }
  deleteHead() {
    // if empty
    if (!this.head) {
      return null;
    } else {
      let removedHead = this.head;
      if (this.head === this.tail) {
        // this is last node in a one node list
        this.head = this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
      return removedHead.value;
    }
  }
  deleteTail() {
    // if empty
    if (!this.tail) {
      return null;
    } else {
      let removedTail = this.tail;
      if (this.head === this.tail) {
        this.head = this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
      return removedTail.value;
    }
  }
  search(value) {
    let currentNode = this.head; // start at head and traverse using while
    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
}

class Node {
  constructor(value, prev, next) {
    this.value = value;
    this.prev = prev || null;
    this.next = next || null;
  }
}

let list = new LinkedList();

list.append(5);
list.append(5);
list.append(1);
list.append(12);
list.append(3);
list.append(5);
list.append(1);

function removeDuplicates(list) {
  // Optimized here
  if (!list) {
    return null;
  }
  let currentNode = list.head;
  let hash = {};
  while (currentNode !== null) {
    if (hash[currentNode.value]) {
      // case: value already in hash table
      // case: is last node
      if (currentNode.next === null) {
        currentNode.prev.next = null;
        list.tail = currentNode.prev;
      } else {
        // case: is any other node
        currentNode.prev.next = currentNode.next;
        currentNode.next.prev = currentNode.prev;
      }
      currentNode = currentNode.next;
    } else {
      // case: value not yet in hash table
      hash[currentNode.value] = 1;
      currentNode = currentNode.next;
    }
  }

  return list;
}

// T(ests):

const dupesGone = removeDuplicates(list);
console.log('edited list :', dupesGone);

function print(list) {
  let currentNode = list.head;
  console.log('the following are all the items in the edited list: ');
  while (currentNode !== null) {
    console.log(currentNode.value);
    currentNode = currentNode.next;
  }
  return;
}

console.log(print(dupesGone));

// O(ptimize): see lines 130-133;
// Solution is: O(N) time (uses 1 while loop), and O(N) space (uses hash table)
