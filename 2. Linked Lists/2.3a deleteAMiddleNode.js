// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================
/*

Question 2.3 - Delete Middle Node:

Implement an algorithm to delete a node in the middle (i.e., any node but the first and last node, not necessarily the exact middle) of a singly linked list, given only access to that node.


R(ephrase): given any node, remove it from the SLL as long as it is neither the head nor the tail node. Should edit the SLL, but does not return anything.

E(xamples):

Given Node value B, remove it from the middle:
              *
|NULL|<-|A|->|B|->|C|->|D|->|E|->|NULL|
       (head)              (tail)

Return null, but edited SLL when printed should now be:

|NULL|<-|A|->|C|->|D|->|E|->|NULL|   
       (head)         (tail)


A(pproach):

-> The following only works when the list does not have repeated element values, and you give the function a value as the input
-> Solution fits the problem description but is not very useful - you still need access to the list/list's variable
-> Theoretically, if you were "given access to just that node" you would just reassign it's value to the value of the next node.
-> Then set the .next node to be the current node's .next.next
C(ode):

*/

// Will start by setting up my SinglyLinkedList class and Node class to use for testing:

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }
  // add to end
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

function deleteMiddleNode(list, targetNodeVal) {
  let currentNode = list.head;
  if (currentNode.value === targetNodeVal) {
    return 'HEAD is an invalid node';
  }
  while (currentNode) {
    if (currentNode.value === targetNodeVal && currentNode.next !== null) {
      let oldCurrent = currentNode;
      currentNode.value = oldCurrent.next.value;
      currentNode.next = oldCurrent.next.next;
      console.log('list successfully edited: ');
      return list;
    } else {
      if (currentNode.next === null) {
        return 'TAIL is an invalid node';
      }
      currentNode = currentNode.next;
    }
  }

  console.log('list not edited, node not found, see original list: ');
  return list;
}

// T(est):

let list = new SinglyLinkedList();

list.append('A');
list.append('B');
list.append('C');
list.append('D');
list.append('E');

// console.log("original list: ", list);
console.log(deleteMiddleNode(list, 'B'));
console.log(deleteMiddleNode(list, 'A'));
console.log(deleteMiddleNode(list, 'E'));
console.log(deleteMiddleNode(list, 'C'));
// console.log("edited list: ", list);

// O(ptimize): n/a

// O(N) time where N is the number of elements down the list that node is
// Constant O(1) space
