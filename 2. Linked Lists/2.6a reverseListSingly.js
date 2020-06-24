// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 2.6a - Reverse a Singly Linked List

R(ephrase): change the read direction of the SLL to read from tail to head (backward)

E(xamples):
  Input:
  |1|->|2|->|3|->|4|->|5|->|6|->|NULL| 
  
  Output:
  |6|->|5|->|4|->|3|->|2|->|1|->|NULL| 

A(pproach):
-> check to see if list is empty or only 1 node long - no need to reverse
-> if longer, before making while loop set 3 things:
   - beginning of reversed list should be this list.head
   - reversed list should have next pointer pointing to null
   - set currentNode to the node after the head
-> while loop:
   - temp holds on to current node
   - currend node set to next
   - temp's next is set to reversed list 
   - reversed list is set to temp
   - ultimately this both increments the current node for the while loop, and also rearranges the pointers to point backwards without losing the middle of the 3 nodes involved (reversed list, current, and next)
->

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

function reverse(list) {
  let head = list.head;
  //  no need to reverse if head is null
  //  or there is only 1 node.
  if (!head || !head.next) {
    return head;
  }

  let currentHead = head.next;
  let reversedList = head;
  reversedList.next = null;

  while (currentHead) {
    let temp = currentHead;
    currentHead = currentHead.next;

    temp.next = reversedList;
    reversedList = temp;
  }

  return reversedList;
}

// T(est):

let list = new SinglyLinkedList();

list.append(1);
list.append(2);
list.append(3);

console.log('ORIGINAL LIST: ', list);
console.log('REVERSED LIST: ', reverse(list));

// O(ptimize):
// see lines 76 - 78
// O(N) time, O(N) space because the size of reversedList is dependent on how large the original list is

// NOTE: original list will be mutated
