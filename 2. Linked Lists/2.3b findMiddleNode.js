// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 2.3b - Find Middle Node Faster:

You are given a singly linked list - find and return the node at the middle of the list.
You choose what to do if list has even vs odd number of nodes.


R(ephrase): 
Find the center of a singly linked list.
For lists with odd # nodes, return exact middle node. 
For lists with even # nodes, return the node closest to but not after the middle.

E(xamples):
           *
|1|->|2|->|3|->|4|->|5|->|NULL|
return node with value 3

      *
|1|->|2|->|3|->|4|->|NULL|
return node with value 2



A(pproach):
-> read through to end of linked list, setting 2 pointers (currentNode and runner) both starting at list.head
-> for each move forward, currentNode points to currentNode.next and runner points to runner.next.next
-> since runner is going forward "2x faster" than currentNode, when runner hits end, currentNode will be at middle
-> break loop and return the currentNode
-> should take O(0.5N) time, which reduces to O(N) time -- the letting of variables results in O(1) space

*/

// C(ode):

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

function findMiddleNodeFaster(list) {
  let currentNode = list.head;
  let runner = list.head;

  while (runner) {
    if (runner.next === null || runner.next.next === null) {
      return currentNode;
    } else {
      runner = runner.next.next;
      currentNode = currentNode.next;
    }
  }
  return currentNode;
}

// T(est):

let list1 = new SinglyLinkedList();

list1.append(1);
list1.append(2);
list1.append(3);
list1.append(4);

let list2 = new SinglyLinkedList();

list2.append(1);
list2.append(2);
list2.append(3);
list2.append(4);
list2.append(5);

console.log('LIST 1 RESULTS: ', findMiddleNodeFaster(list1)); // even # of nodes, expect value = 2
console.log('LIST 2 RESULTS: ', findMiddleNodeFaster(list2)); // odd # of nodes, expect value = 3

// O(ptimize):

// takes O(log(N)) time, and constant O(1) space

// this method is faster than iterating through every node to get the length of the list,
// then dividing the list length by 2,
// and then iterating through that number of nodes again.
