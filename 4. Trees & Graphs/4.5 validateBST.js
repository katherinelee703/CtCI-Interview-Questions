// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.5 - Validate BST:

Implement a function to check if a binary tree is a binary search tree.
Hints: #35, #57, #86, # 113, # 128

R(ephrase):
E(xample):
A(pproach):
C(ode):

*/

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(val) {
    let node = this.root;
    if (node === null) {
      // it will when tree is empty
      return (this.root = new Node(val));
    }
    function find(node) {
      if (val < node.val) {
        // put on left half of tree
        if (node.left === null) {
          return (node.left = new Node(val));
        }
        return find(node.left);
      } else if (val > node.val) {
        // put on right half of tree
        if (node.right === null) {
          return (node.right = new Node(val));
        }
        return find(node.right);
      } // else val is already in tree, cannot add it in again
      return null;
    }
    return find(node); // call this to start the recursive process
  }
}

function checker(node, min, max) {
  if (!node) {
    // we got to the end leaves of the tree and didn't break the rules...
    return true;
  }
  if (node.val < min || node.val > max) {
    // found a node that was out of BST required ordering
    return false;
  }
  // if we get here that means we still have nodes to check
  return (
    checker(node.left, min, node.val - 1) &&
    checker(node.right, node.val + 1, max)
  );
}

function validateBST(bst) {
  return checker(root, -Infinity, Infinity);
}

// T(est):

let bst = new BST();

bst.insert(10);
bst.insert(2);
bst.insert(3);
bst.insert(5);
bst.insert(20);
bst.insert(12);
bst.insert(15);
bst.insert(1);
bst.insert(24);
bst.insert(24);

validateBST(bst); // expect true;

/* 

Optimize:

Instead of using the easy to read +/- Infinity on line 48, this is technically a safer way:
Number.MIN_SAFE_INTEGER 
Number.MAX_SAFE_INTEGER

O(N) time where N is # of nodes, because we must visit every single node in the BST to make sure it is validly placed
O(N) space where N is # of nodes, due to the # of recursive calls on the stack in the worst case

*/
