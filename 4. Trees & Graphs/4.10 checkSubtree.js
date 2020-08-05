// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.10 - Check Subtree:

T1 and T2 are two very large binary trees, with T1 much bigger than T2. 
Create an algorithm to determine if T2 is a subtree of T1.
A tree T2 is a subtree of T1 if there exists a node n in T1 such that the subtree of n is identical to T2.
That is, if you cut off the tree at node n, the two trees would be identical.
Hints: #4, #11, #18, #31, #37

R(ephrase): see if a smaller binary tree is EXACTLY part of a bigger binary tree
E(xample): see lines 85 - 98
A(pproach): see notes within the code
C(ode):

*/

function isSubtree(s, t) {
  // base case: there's no s
  if (!s) return !t; // if t is truthy val,
  // returns false bc how could a subtree be in a non-existant tree
  // else call helper function to check on 3 situations,
  // 1 of which must be true at some point

  // 1st will execute isEqual to see if tree and subtree are same whole trees
  // 2nd then will start executing isSubtree on the left side nodes if it wasn't same tree yet
  // 3rd and also start executing isSubtree on the right side nodes if it wasn't same tree yet
  return isEqual(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
  // when the replies to these questions eventually return up the callstack
  // it will return true if any of these three are true, which means the subtree was found somewhere
  // but if all 3 are false, it will return false bc it wasn't found at all:
  // a copy of the whole tree
  // a portion of the left subtree
  // a portion of the right subtree
}

function isEqual(biggerTree, smallerTree) {
  // eventually we will run out of nodes to check going downward so, when we run out we
  // return true if both ran out at same time (tree is same shape so far)
  // or return false bc one side will end before the other making them different shapes
  if (!biggerTree || !smallerTree) return !biggerTree && !smallerTree;

  // this is what happens before we run out of things to check
  // we check what we are on, and make sure they are same values. if not return false immediately
  if (biggerTree.val !== smallerTree.val) return false;

  // if they are equal so far, we need to keep searching downwards
  // which requires a check to the left and a check to the right again recursively
  // the final return here will be true if the left & right sides both "end" as same shape
  // the final return will be false if one side of the shape didn't match up (the tree might have matched for some portion of the subtree, but then became wrong after subsequent checks)
  return (
    isEqual(biggerTree.left, smallerTree.left) &&
    isEqual(biggerTree.right, smallerTree.right)
  );
}

// T(est):

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
/*
      TREE B                        TREE A           TREE C
 
*         |5|                            
*        /   \                             
*       /     \                              
*    |2|      |14|                   |2|              |2|
*   /   \     /  \                  /   \            /   \
*  |1| |3|  |9|   |22|             |1|  |3|        |1|   |5|
*           / \                              
*         |7| |13|                           
*         / \
*       |6| |8|                       
*/

let treeA = new BinaryTree(2);
treeA.insert(1);
treeA.insert(3);

let treeB = new BinaryTree(5);
treeB.insert(2);
treeB.insert(14);
treeB.insert(1);
treeB.insert(3);
treeB.insert(9);
treeB.insert(22);
treeB.insert(7);
treeB.insert(13);
treeB.insert(6);
treeB.insert(8);

let treeC = new BinaryTree(2);
treeC.insert(1);
treeC.insert(5);

console.log(isSubtree(treeB, treeA)); // expect true;
console.log(isSubtree(treeB, treeC)); // expect false;

// O(ptimize): O() time, O() space, where N is the number of nodes???
