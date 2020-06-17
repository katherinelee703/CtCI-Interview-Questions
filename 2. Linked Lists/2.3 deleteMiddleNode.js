// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 2.3 - Delete Middle Node:

Implement an algorithm to delete a node in the middle (i.e., any node but the first and last node, not necessarily the exact middle) of a singly linked list, given only access to that node.


R(ephrase): my version: given a list and any particular node's value, remove it from the SLL as long as it is neither the head nor the tail node. Should mutate the SLL, but does not return anything.

E(xamples):

Given Node value B, remove it from the middle:
              *
|NULL|<-|A|->|B|->|C|->|D|->|E|->|NULL|
       (head)              (tail)

Return null, but edited SLL when printed should now be:

|NULL|<-|A|->|C|->|D|->|E|->|NULL|   
       (head)         (tail)


A(pproach):

-> The below uncommented version only works when the list does not have repeated element values, and you give the function a node value as the input
-> You still need access to the list/list's variable
-> Theoretically, if you were "given access to just that node" you would just reassign it's value to the value of the next node.
-> Then set the .next node to be the current node's .next.next


C(ode):

*/

// Will start by setting up my SinglyLinkedList class and Node class to use for testing:

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
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

let list = new SinglyLinkedList();

list.append('A');
list.append('B');
list.append('C');
list.append('D');
list.append('E');

// * * * A Simpler Solution assuming you somehow got direct access to an actual Node and don't need to input the list into the function:

function removeMiddleNode(node) {
  if (!node || !node.next) {
    return 'invalid node';
  }
  node.value = node.next.value;
  node.next = node.next.next;
  return;
}

// my version, testable on repl.it :

function deleteMiddleNode(list, nodeVal) {
  let currentNode = list.head;
  if (!nodeVal || nodeVal === list.head.value || nodeVal === list.tail.value) {
    return 'invalid node';
  } else {
    while (currentNode) {
      if (currentNode.value === nodeVal) {
        let oldCurrent = currentNode;
        currentNode.value = oldCurrent.next.value;
        currentNode.next = oldCurrent.next.next;
        console.log('list successfully edited');
        return;
      } else {
        currentNode = currentNode.next;
      }
    }
  }
  console.log('list not edited, node not found');
  return;
}

// T(est):

console.log('original list: ', list);
console.log(deleteMiddleNode(list, 'B'));
console.log(deleteMiddleNode(list, 'A'));
console.log(deleteMiddleNode(list, 'E'));
console.log('edited list: ', list);

// O(ptimize): n/a

// O(N) time where N is the number of elements down the line that node is
// 0 extra space needed
