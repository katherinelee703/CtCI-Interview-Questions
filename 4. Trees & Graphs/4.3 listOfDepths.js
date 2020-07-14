// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.3 - List Of Depths:

Given a binary tree, design an algorithm which creates a linked list of all the nodes
at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).
Hints: #107, #123, #135

R(ephrase): return an array of SLL, with each list containing a level of the tree
E(xample): see line 123
A(pproach): search tree "level by level"

- for every level, push the values into a new SinglyLinkedList
- when each level finishes, push the whole SLL into the return array as an element

- utilize a queue structure (can just be an array that you .shift() from)
- put each level into the queue
- read each item and put into SLL
- iterate when queue is empty

* see notes in code below

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
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insert(val) {
    if (val <= this.value) {
      if (this.left === null) {
        this.left = new BinaryTree(val);
      } else {
        this.left.insert(val);
      }
    } else {
      if (this.right === null) {
        this.right = new BinaryTree(val);
      } else {
        this.right.insert(val);
      }
    }
  }
}

const listOfDepths = (root) => {
  let listOfLists = [];
  if (root) {
    // root is not null
    let runningQ = [root];
    let currentLevel = new SinglyLinkedList();
    let nextLevel = [];
    while (runningQ.length) {
      // queue isn't empty
      let node = runningQ.shift();
      currentLevel.append(node.value);
      if (node.left) {
        nextLevel.push(node.left);
      }
      if (node.right) {
        nextLevel.push(node.right);
      }
      if (runningQ.length === 0) {
        // this level finished
        // push current level to listOfLists & reassign queue so it attempts next level
        listOfLists.push(currentLevel);
        runningQ = nextLevel;
        currentLevel = new SinglyLinkedList();
        nextLevel = [];
      }
    }
  }

  return listOfLists;
};

/* T(est):

This code should be able to create this tree:
        |5|
       /   \
     /       \
   |2|       |7|
  /   \     /   \
|1|   |3| |6|   |8|
*/

let myTree = new BinaryTree(5);
myTree.insert(2);
myTree.insert(3);
myTree.insert(1);
myTree.insert(7);
myTree.insert(8);
myTree.insert(6);

let result = listOfDepths(myTree);

function printList(list) {
  let current = list.head;
  while (current) {
    console.log(current.val);
    current = current.next;
  }
  return;
}

console.log('level 1: '); // expect 5
printList(result[0]);
console.log('level 2: '); // expect 2, 7
printList(result[1]);
console.log('level 3: '); // expect 1, 3, 6, 8
printList(result[2]);

console.log('result: ', result); // expect an array with the 3 levels listed in SLL format

// O(ptimize):
// O(N) time because we must touch each node in the tree once in order to complete the lists
// O(N) space because we must put each value into a SLL and the SLL size depends how many nodes there are in the tree
