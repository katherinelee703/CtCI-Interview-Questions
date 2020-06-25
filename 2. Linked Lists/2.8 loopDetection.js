// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 2.8 - Loop Detection: 

Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop.

DEFINITION
Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so
as to make a loop in the linked list.

R(ephrase): check whether a linked list has been corrupted, and return the culprit node.

E(xample):
                     
Input: |A| -> |B| -> |C| -> |D| -> |E| -> |C| 
                      |--------------------|
                       the same C as earlier

Output: C (because C is where the list looped back to)


A(pproach):
  -> send a slow runner 1 ahead each turn
  -> send a fast runner 2 ahead each turn
  -> if slow runner and fast runner meet:
    -> leave fast runner at point where met
    -> put slower runner back at start
    -> increment each by 1 now,
    -> the place they meet cycle's start node
  ->if they never overlap, then the list is not circular


C(ode):

*/

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }
  // adds node to end
  append(value) {
    // if list is empty
    if (!this.head) {
      return (this.head = new Node(value));
    } else {
      let eventualTail = this.head;
      while (eventualTail.next !== null) {
        eventualTail = eventualTail.next;
      }
      return (eventualTail.next = new Node(value));
    }
  }
  // adds node to beginning
  prepend(value) {
    // if list is empty
    if (!this.head) {
      this.head = new Node(value);
    }
    let oldHead = this.head;
    this.head = new Node(value);
    this.head.next = oldHead;
  }
}

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function loopDetection(list) {
  // Optimize:
  if (!list) {
    return null;
  }
  if (!list.head) {
    return null;
  }
  let tortoise = list.head;
  let hare = list.head;
  while (hare) {
    tortoise = tortoise.next;
    if (hare.next === null || hare.next.next === null) {
      return 'NO LOOP';
    }
    hare = hare.next.next;
    if (tortoise == hare) {
      break;
    }
  }
  if (tortoise === hare) {
    tortoise = list.head;
    while (tortoise) {
      if (tortoise === hare) {
        return tortoise;
      } else {
        tortoise = tortoise.next;
        hare = hare.next;
      }
    }
  }
}

// T(est):

let mylist = new SinglyLinkedList();
mylist.append(1);
mylist.append(2);
mylist.append(3);
mylist.append(4);

let currentNode = mylist.head;

while (currentNode) {
  if (currentNode.next === null) {
    break;
  }
  currentNode = currentNode.next;
}

currentNode.next = mylist.head.next; // expect node value 2

let mylist2 = new SinglyLinkedList();
mylist2.append(1);
mylist2.append(2);
mylist2.append(3);
mylist2.append(4);
mylist2.append(5);

console.log('MYLIST TEST: ', loopDetection(mylist));
console.log('MYLIST2 TEST: ', loopDetection(mylist2));

// O(ptimize):
// see lines 78 - 84
// O(N) time, constant O(1) space
