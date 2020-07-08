// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.2 - Minimal Tree:

Given a sorted (increasing order) array with unique integer elements, 
write an algorithm to create a binary search tree with minimal height.

R(ephrase): since array is sorted small to big, we go from the middle and put all elements into the format of a BST

E(xample): 
  Input: [1,2,3,4,5,6,7]
	Output: 
							|4|
						 /   \
						/     \
					|2|     |6|
				 /   \   /   \
				|1| |3| |5| |7|
				
A(pproach): 
- find the middle element of the array 
  (or whatever is closest to middle on one side when elements are of even number), 
  and split into left and right halves arrays
- make the center the BST's root node, 
  and then set the root's .left and .right to recursive calls on left and right halves of the now split array (without the middle element in it)
- base case will be when left array half and right array half have been cut down so much that they are empty
- return values will bubble up and place themselves in BST format, with root node being the final return

C(ode):

*/

class BST {
  constructor(val) {
    this.root = val;
    this.left = null;
    this.right = null;
  }
}

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

function minimalBST(arr) {
  // base case:
  if (arr === null || !arr.length) {
    // return null when arr is emptied so all return values on call stack are bubbled up back to first call
    return null;
  }

  let midpoint = Math.floor(arr.length / 2);
  // arr[midpoint] becomes the "parent" node of next layer
  const bstNode = new Node(arr[midpoint]);
  // make left and right recursive calls until the arrays have been split down to empty and hit base case
  bstNode.left = minimalBST(arr.slice(0, midpoint));
  bstNode.right = minimalBST(arr.slice(midpoint + 1));
  // recursive calls will return in reverse order made the the bstNode returning will be the root node
  return bstNode;
}

// T(est):

let testArray1 = [1, 2, 3, 4, 5, 6, 7];
console.log('test1: ', minimalBST(testArray1));

let testArray2 = [12, 72, 80];
console.log('test2: ', minimalBST(testArray2));

// Optimize: this runs on O(n) time because we must touch every item in the array
