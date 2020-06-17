// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 2.1 - Remove Duplicates:

Implement an algorithm to find the kth to last element of a singly linked list.


R(ephrase): find the kth element, return the rest of the singly linked list from that point to the end

E(xamples):

Given this: Return from 4th element (index 3) to end of LL
                        *
|NULL|<-|8|->|7|->|4|->|5|->|1|->|12|->|3|->|NULL|
       (head)                         (tail)

Return this:

|NULL|<-|5|->|1|->|12|->|3|->|NULL|
        |5|  |1|  |12|  |3|
       (head)          (tail)


A(pproach):

->

C(ode):

*/

// Will start by setting up my LinkedList class and Node class to use for testing:

class SinglyLinkedList {
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
    }
  }
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
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

let list = new SinglyLinkedList();

list.append(8);
list.append(7);
list.append(4);
list.append(5);
list.append(1);
list.append(12);
list.append(3);

function returnKtoLast(list, k) {
  // Optimized here
  if (k < 1) {
    return 'please enter an integer above zero';
  }
  let currentNode = list.head;
  let counter = 1;
  while (currentNode) {
    if (counter === k) {
      return currentNode;
    } else {
      counter += 1;
      currentNode = currentNode.next;
    }
  }
  return `no element #${k} was found, here is the original list: ${list}`;
}

// T(ests):

// console.log("try 1: ", returnKtoLast(list, 7));
// console.log("try 2: ", returnKtoLast(list, 0));
// console.log("try 3: ", returnKtoLast(list, 1));
// console.log("try 4: ", returnKtoLast(list, 2));
// console.log("try 5: ", returnKtoLast(list, 3));
// console.log("try 6: ", returnKtoLast(list, 4));
// console.log("try 7: ", returnKtoLast(list, 5));

console.log('example test case: ', returnKtoLast(list, 4));

// O(ptimize): see lines 83 - 86

// O(N) time, where N is the value of k
// no extra space needed
