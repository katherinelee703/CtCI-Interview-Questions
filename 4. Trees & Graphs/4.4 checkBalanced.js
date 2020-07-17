// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.4 - Check Balanced:

Implement a function to check if a binary tree is balanced. 
For the purposes of this question, a balanced tree is defined to be a tree such that:
the heights of the two subtrees of any node never differ by more than one.
Hints: #21, #33, #49, # 105, #124

R(ephrase): an unbalanced tree will at some point, anywhere in the tree structure, have a left & right subtree 
whose final depth (ie height from leaf to node being tested as the root) differ by more than 1 level. 
Write code to check any tree for being unbalanced vs balanced.

E(xample):

      TREE B                          TREE A
 
         |5|                            |5|
        /   \                          /   \
       /     \                        /     \
    |2|      |14|                   |2|     |14|
   /   \     /  \                      \    /  \
  |1| |3|  |9|   |22|                 |3| |9|  |22|
           / \                              \
         |7| |13|                           |11|
         / \
       |6| |8|                       

TREE B is NOT balanced because the left subtree has 3 levels and the right has 5 (diff is higher than 1)
TREE A IS balanced because the difference in height of the left and right subtrees is just 1 different

A(pproach): checking a binary tree using a recursive function that will check left and right subtree to meet the requirement:
|left subtree's final height - right subtree's final height| <= 1 means tree is balanced, > 1 means unbalanced
see comments and logs in the function - I left in many logs so we can see where the imbalance happens and how it is assessed

C(ode):

*/

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

let counter = 0;

function height(root) {
  ++counter;
  // console.log("height just called")
  if (!root) return 0; // this is the end/bottom/leaf node, so it has ZERO height

  let leftH = height(root.left); // checks all left-ish subtrees
  let rightH = height(root.right); // checks all right-ish subtrees

  if (leftH === -1 || rightH === -1 || Math.abs(leftH - rightH) > 1) {
    console.log('hi we hit -1 on call #', counter);
    console.log('leftH: ', leftH);
    console.log('rightH: ', rightH);
    console.log('-----------------');
    return -1; // -1 is not really a height, but a signaler that we are out of balance as of now
  }
  console.log(
    'L:',
    leftH,
    ' R:',
    rightH,
    ' |  call count: ',
    counter,
    ' |  returned: ',
    1 + Math.max(leftH, rightH)
  );

  return 1 + Math.max(leftH, rightH);
}

const isBalanced = (root) => {
  if (!root) return true;
  let h = height(root);
  console.log('final height will only be -1 if UN-balanced: ', h);
  console.log('------------------\n------------------');

  return h !== -1;
};

// T(est):

let treeA = new BinaryTree(5);
treeA.insert(2);
treeA.insert(14);
treeA.insert(3);
treeA.insert(9);
treeA.insert(22);
treeA.insert(11);

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

console.log('TREE A is balanced: ', isBalanced(treeA)); //expect true
console.log('TREE B is balanced: ', isBalanced(treeB)); // expect false

// Optimize:
