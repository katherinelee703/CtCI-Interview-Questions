// Chapter 4: Trees & Graphs

//==============================================================================

/*

Question 4.1 - Route Between Nodes:

Given a directed graph, design an algorithm to find out 
whether there is a route between two nodes.

R(ephrase): given nodeA & nodeB, can I get from nodeA to nodeB in this particular graph?

E(xample):
  Input graph could look like this:

    |3| --> |6| --> |7| <-- |8| 
   /   \
   |     --> |5| --> |1| <---
   |          |               \
    \          \               |
      --> --> --> --> |4| --> |2| 

 *Possible Outputs:
  3 can get to anyone except 8
  8 can only get to 7
  5 can arrive at 1 via 2 different paths
	3 has a shorter path to 1 by passing 5 first than by passing 4 first, bc it is 1 "level" closer
	 
A(pproach): will use Breadth First Search -> see comments within the code

C(ode):	

*/

class Graph {
  constructor() {
    this.nodes = [];
  }
  addNode(node) {
    this.nodes.push(node);
  }
}

class Node {
  constructor(val) {
    this.value = val;
    this.children = [];
  }
}

class Queue {
  constructor() {
    this.q = [];
  }
  enqueue(val) {
    this.q.push(val);
  }
  dequeue() {
    if (this.q.length === 0) return -1;
    return this.q.shift();
  }
  peek() {
    return this.q[0];
  }
  isEmpty() {
    return this.q.length === 0;
  }
}

function pathBetweenNodes(node1, node2) {
  // lets track the searching path just for fun...
  // put node1 in path array bc that's the start point
  let path = [node1];
  // do BFS - breadth first search (level by level)
  function bfs(start, end) {
    // we need to utilize a queue
    let visited = new Queue();
    // hold start node in visited queue bc we're already here
    visited.enqueue(start);
    // while things are in the queue...
    // (will run from 1st try bc start node is already in visited)
    while (!visited.isEmpty()) {
      // currentNode is first item out of visited queue (bc FIFO)
      let currentNode = visited.dequeue();
      // check all children (1 level away) from currentNode
      for (let i = 0; i < currentNode.children.length; i++) {
        let child = currentNode.children[i];
        // if a particular child is the end node
        if (child === end) {
          // finish the path by putting the end/child in path & return
          path.push(child);
          return true;
          // when the child is not the end node
        } else {
          // put in the visited queue so that it's children (the next level down) will get checked next, in order
          visited.enqueue(child);
          // put it in the path bc we passed it while searching
          path.push(child);
        }
      }
    }
    // while loop has finished and since we didn't find the end,
    // that means every path open to us from node1 has been checked, so we can't get to node2 from there...
    return false;
  }
  // now we made our bfs function
  // lets make the variable "result" be the output of bfs called on our node1 and node2
  let result = bfs(node1, node2);
  // that has now evaluated and done all the steps that would push items into our search path
  // so let's log the final path we took til wherever we stopped
  console.log('total path: ', path);
  // now lets see if we were able to get there or not!
  return result; // expect boolean
}

// T(est):

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);
let node5 = new Node(5);
let node6 = new Node(6);
let node7 = new Node(7);
let node8 = new Node(8);

node3.children.push(node4, node5, node6);
node4.children.push(node2);
node2.children.push(node1);
node5.children.push(node4, node1);
node6.children.push(node7);
node8.children.push(node7);

console.log('3 -> 1', pathBetweenNodes(node3, node1));
// expect true
console.log('3 -> 8', pathBetweenNodes(node3, node8));
// expect false
console.log('3 -> 7', pathBetweenNodes(node3, node7));
// expect true
console.log('8 -> 7', pathBetweenNodes(node8, node7));
// expect true
console.log('5 -> 1', pathBetweenNodes(node5, node1));
// expect true
console.log('5 -> 3', pathBetweenNodes(node5, node3));
// expect false

/*

could use Graph class to encase problem and get nodes to put into the function like this: 

let testGraph = new Graph();

testGraph.addNode(node1,node2,node3,node4,node5,node6,node7);

pathBetweenNodes(testGraph.nodes[2], testGraph.nodes[0])

*

O(ptimize): 

using Breadth first seach is O(v+e) time 
where v = # of vertices (nodes)
and e = # of edges (connection lines)

*/
