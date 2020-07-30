// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.8 - First Common Ancestor:

Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. 
Avoid storing additional nodes in a data structure. 
NOTE: This is not necessarily a binary "search" tree.
Hints: #10, #16, #28, #36, #46, #70, #80, #96

R(ephrase): 
	-> most likely will not be given a .parent link in the nodes, so we must be given the root as well as the 2 desired nodes to start the problem with
	-> search the tree to find which node is the first to connection point for the 2 desired given nodes

E(xample):

      TREE B                          
 
*         |5|                            
*        /   \                          
*       /     \                        
*    |2|      |14|                   
*   /   \     /  \                      
*  |1| |3|  |9|   |22|                 
*           / \                              
*         |7| |13|                          
*         / \
*       |6| |8| 

	given 2 & 14, expect 5
	given 1 & 3, expect 2
	given 6 & 14, expect 14

A(pproach): 

	-> requires recursion
	-> base case: the current node we are on is either null (!root), or the current node IS 1 of the 2 requested nodes

	-> check left subtree recursively, calling root.left
	-> check right subtree recursively, calling root.right

	-> if we get to the bottom of left and don't find it, left will be null (falsy); 
	-> if we get to the bottom of right and don't find it, right will be null (falsy);

	-> if !left, return right to call stack to make next search check remaining portion of right side instead
	-> if !right, return left to call stack to make next search check remaining portion of left side instead;
			
	-> else, then left & right are truthy vals (1 requested node is in left, and 1 is in right)
    -> so return root because that is the only feasible node that could connect the 2 desired nodes


C(ode):

*/

function firstCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) {
    // root is the LCA and the 2 given nodes are the first 2 children;
    return root;
  }

  // check left
  let left = firstCommonAncestor(root.left, p, q);

  // check right
  let right = firstCommonAncestor(root.right, p, q);

  // check which side to traverse further
  if (!left) return right; // if we get to bottom of leftmost and it returns up a falsy value (null), we know we must search the right subtree
  if (!right) return left; // if we get to bottom of rightmost and it returns up a falsy value (null), we know we must search the left subtree

  // what if both left and right are truthy val?
  return root; // since one val is somewhere in left subtree, and other val is somewhere in right subtree,  only common ancestor can be root
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

//console.log(treeB);

console.log(firstCommonAncestor(treeB, treeB.left, treeB.right)); // 2 & 14, expect 5
console.log(firstCommonAncestor(treeB, treeB.left.left, treeB.left.right)); // 1 & 3, expect 2
console.log(
  firstCommonAncestor(treeB, treeB.right.left.left.left, treeB.right)
); // 6 & 14 , expect 14

// Optimize: O(N) time O(N) space
