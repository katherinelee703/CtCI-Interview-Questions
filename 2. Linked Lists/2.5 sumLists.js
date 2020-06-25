// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 2.5a - Sum Lists Backward Numbers:

You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the 1's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.


R(ephrase): multi-digit numbers are represented as linked lists - add the numbers up by traversing the LLs and then represent the result as a linked list in the same format

E(xamples):

PART 1 EXAMPLE
              (list) + (list)
Input: |7|->|1|->|6| + |5|->|9|->|2| 
This represents 617 + 295

            (list)
Output: |2|->|1|->|9| 
This represents 912

A(pproach):
-> we need a current variable for each of the 2 lists so we can traverse them together
-> we also need to set up a new empty linked list to hold the eventual sum to return
-> we can also let an "innersum" which will be the variable we put into the new linked list at each digit's place
-> we should set a carry over variable in case the 2 digits being added are greater than 10


C(ode):

*/

// Will start by setting up my SinglyLinkedList class and Node class to use for testing:

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

const sumLists = (first, second) => {
  let firstCurrent = first.head;
  let secondCurrent = second.head;
  let sum = new SinglyLinkedList();
  let innerSum = 0;
  let carryOver = 0;

  while (firstCurrent !== null && secondCurrent !== null) {
    if (carryOver !== 0) {
      firstCurrent.value += carryOver;
    }
    if (firstCurrent.value + secondCurrent.value >= 10) {
      let val = firstCurrent.value + secondCurrent.value;
      val = val.toString();
      let tens = val.slice(0, 1);
      let ones = val.slice(1);
      innerSum = innerSum + Number(ones);
      carryOver = Number(tens);
      if (firstCurrent.next === null || secondCurrent.next === null) {
        sum.append(innerSum);
        sum.append(carryOver);
        carryOver = 0;
      } else {
        sum.append(innerSum);
      }
      innerSum = 0;
    } else {
      // less than ten
      innerSum = firstCurrent.value + secondCurrent.value;
      sum.append(innerSum);
      innerSum = 0;
    }
    firstCurrent = firstCurrent.next;
    secondCurrent = secondCurrent.next;
  }

  return sum;
};

// T(est):

let numAsList1 = new SinglyLinkedList();

numAsList1.append(7);
numAsList1.append(1);
numAsList1.append(6);
// Represents number 617

let numAsList2 = new SinglyLinkedList();

numAsList2.append(5);
numAsList2.append(9);
numAsList2.append(2);
// Represents number 295

let numAsList3 = new SinglyLinkedList();

numAsList3.append(6);
numAsList3.append(1);
numAsList3.append(7);
// Represents number 716

let numAsList4 = new SinglyLinkedList();

numAsList4.append(2);
numAsList4.append(9);
numAsList4.append(5);
numAsList4.append(1);
// Represents number 592

const result1 = sumLists(numAsList1, numAsList2);
const result2 = sumLists(numAsList3, numAsList4);

console.log('RESULT 1: ', result1);
// expect |2|->|1|->|9|->|NULL| Representing number 912
console.log('RESULT 2: ', result2);
// expect |8|->|0|->|3|->|1|->|NULL| Representing number 1308

// O(ptimize): n/a

// O(N) time, O(N) space, N being the number of nodes in original list
