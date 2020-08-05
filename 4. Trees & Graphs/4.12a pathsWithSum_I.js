// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.12a - Paths With Sum I:

Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.
      Note: A leaf is a node with no children.
 
 * R(ephrase):
 * given a particular binary tree (maybe not a BST), where each node is a #, find if there is a complete root-to-leaf path that adds to exactly the given number of 'sum'; if so return true, else return false
 * 
 * E(xample): sum is 22
 
     *5
     / \
   *4   8
   /   / \
 *11  13  4
 /  \      \
7   *2      1

5 + 4 + 11 + 2 === 22, return true

but,

      5
     / \
    4   8
   /   / \
  11  13  4
 /         \
7           1 this returns false bc none of the root-to-leaf paths add up to 22

 * A(pproach):
 * start with the root node,
 *  if there's no root/ root is null we know this will be false (also the base case in case of recursion)
 * 
 * now, we want to take down the sum until it is 0 - if it hits zero that means we have a path that adds up to it
 * so sum -= root.val
 * 
 * now check if the .left and .right are both null
 * if they are both null, we should also check if the sum === 0
 *   if it does, we return true, because that is a full root-to-leaf path that totaled sum when added
 * 
 * else, root has children that arent null so we should,
 * return the function call on root.left || root.right,
 *  (this will call left if its the truthy one until it hits the end, then/or the right one until it hits the end), and on the way back up it will hit all the other lefts/rights that are eventual leafs
 * eventually hitting the base case which is false for !root, thus having nothing adding up to sum exactly
 * 
 * C(ode):
 */

function hasPathSum(root, sum) {
  // console.log("ROOT: ", root);
  if (root === null) return false;

  sum -= root.value;

  if (root.left === null && root.right === null) {
    if (sum === 0) return true;
  }

  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
}

// * T(est):

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
      TREE B                          TREE A
 
*         |5|                            
*        /   \                             
*       /     \                            
*    |2|      |14|                   |2|     
*   /   \     /  \                  /   \    
*  |1| |3|  |9|   |23|             |1|  |3| 
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
treeB.insert(23);
treeB.insert(7);
treeB.insert(13);
treeB.insert(6);
treeB.insert(8);

console.log('TREEB, 42: ', hasPathSum(treeB, 42)); // expect true, and lots of logs!
// logs 5, 2, 1, null, null, 3, null, null, 14, 9, 7, 6, null, null, 8, null, null, 13, null, null, 23, RETURN TRUE

// console.log("TREEB, 50: ", hasPathSum(treeB, 50)); // expect false, and lots of logs!
// logs 5, 2, 1, null, null, 3, null, null, 14, 9, 7, 6, null, null, 8, null, null, 13, null, null, 23, null, null, RETURN FALSE

// console.log("TREEB, 6: ", hasPathSum(treeB, 6)); // expect false, and few logs
// logs all, then RETURNS FALSE

//console.log("TREEA, 5: ", hasPathSum(treeA, 5)); // expect true, and few logs
// logs 2, 1, null, null, 3, RETURNS TRUE

// console.log("TREEA, 4: ", hasPathSum(treeA, 4)); // expect false, and few logs
// logs 2, 1, null, null, 3, null, null, RETURNS FALSE

// * O(ptimize): runs in O(N) time, worst case, where N is total number of nodes (have to check all), O(N) stack space
