// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.12b - Paths With Sum II:

Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.
      Note: A leaf is a node with no children.


R(ephrase): find the root-to-leaf paths that add to sum, and list them (as nested array) as the return value

E(xample): 

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \    / \
7    2  5   1
Return:

[
   [5,4,11,2],
   [5,8,4,5]
]

A(pproach):
C(ode):

*/

function pathSum(root, sum) {
  return recurseTree(root, sum, [], []);
  // we need to be able to pass 2 "tracking devices"
  // 1 is to hold the current path (in case it works we will push it to answer array)
  // 1 is to hold the ongoing additions to the answer array
}

function recurseTree(root, sum, currentPossiblePath, allPossiblePaths) {
  if (!root) return allPossiblePaths;
  // if we get here, there were either answers in the tree, or it will give an [] if there were no paths

  sum -= root.val;
  currentPossiblePath.push(root.val);
  // we will never reset this to [] because we can reuse the items alread pushed in as we go "back up" the tree

  if (root.left === null && root.right === null && sum === 0) {
    allPossiblePaths.push(currentPossiblePath.slice());
    // we should slice just to be safe, because we are going to keep mutating this array
    // and we don't want any unexpected things changing as we pass it down and back up
    // NOTE: you could also copy it this way [...currentPossiblePath] i.e. spread syntax!
  }

  // now that we've checked where we started, time to start going down the left & right sides of the tree, repeating same steps
  // repeating same steps means recursion!
  recurseTree(root.left, sum, currentPossiblePath, allPossiblePaths);
  recurseTree(root.right, sum, currentPossiblePath, allPossiblePaths);

  // if we get to this line, we have gotten to the bottom of the tree, and need to take off the last leaf item
  // so we can go up a level and check down on that side if there's anything
  // if not, it'll pop() and go up again etc..
  currentPossiblePath.pop();

  return allPossiblePaths;
}

// T(est):
// Optimize: O(N) because we traverse every node in tree, O(N) recursive stack could take up N space
