// Chapter 3: Stacks & Queues
// Solution originally on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 3.5 - Sort Stack:

Write a program to sort a stack such that the smallest items are on the top. 
You can use an additional temporary stack, 
but you may not copy the elements into any other data structure (such as an array). 
The stack supports the following operations: push, pop, peek, and isEmpty.

R(ephrase): take a stack that contains unsorted values and return them in sorted order, inside a stack structure
- don't use any other DS to solve this, expect 1 additional temp stack

E(xample):

Stack { stack: [3,1,2] }
-> should change to Stack { stack: [3,2,1] } // so smallest can .pop() off from the back first

A(pproach):
- make very normal Stack class, with push, pop, peek, and empty
- sortStack function takes a disorderly stack and first makes a tempStack to hold values while sorting
- 1 while loop that runs until input stack is emptied (ie all things have been ordered and place in tempStack)
- 2 inner while loop that runs until things in tempStack are sorted, popping them back out and into original input stack when they are not in order
- need a temp variable to hold the current stack item while sorting in progress, push into tempStack if larger (we want smaller ones to wait until later)
-both loops finish, return the completed temp stack with sorted values in it


C(ode):

*/

class Stack {
  constructor() {
    this.stack = [];
  }
  push(val) {
    this.stack.push(val);
  }
  pop() {
    if (this.stack.length === 0) return -1;
    return this.stack.pop();
  }
  peek() {
    if (this.stack.length === 0) return -1;
    return this.stack[this.stack.length - 1];
  }
  empty() {
    return this.stack.length === 0;
  }
}

//sort to put smallest on top so smallest comes off first
function sortStack(stk) {
  // make another stack to bounce values between with input stack while sorting
  let tempStack = new Stack();
  // while the input stack isn't empty yet...
  while (!stk.empty()) {
    // hold on to the last item you pop off input stack
    let temp = stk.pop();
    // while temp stack isn't empty yet && the last item on it is LESS than temp
    while (!tempStack.empty() && tempStack.peek() < temp) {
      // you want that smaller item to wait till later, so put it back on the input stack
      stk.push(tempStack.pop());
      // eventually this loop will break when either the tempStack is empty or when temp value is smaller value
    }
    // since we've held on to temp and not put it anywhere yet, now it gets to go onto tempStack
    tempStack.push(temp);
    // if it indeed did get pushed onto temp stack, it must be smaller than all items currently in tempStack
    // this will leave temp stack able to pop items off the end starting from smallest values
    // because the smallest values were pushed on at the end
    // the outer while loop will break when we have dealt with every item in input stack, and it becomes empty
  }
  // the values are in the order we want in tempStack now, so we return tempStack
  return tempStack;
}

// T(est):

let test = new Stack();
test.push(2);
test.push(6);
test.push(5);
test.push(1);
test.push(4);
test.push(3);
test.push(7);
test.push(3);
console.log('TEST: ', test); // expect TEST: Stack { stack: [2,6,5,1,4,3,7,3] }

sortStack(test); // expect Stack { stack: [7,6,5,4,3,3,2,1] }

// O(ptimize): in progess...
// current solution version is O(n^2) time and takes O(n) additional space
