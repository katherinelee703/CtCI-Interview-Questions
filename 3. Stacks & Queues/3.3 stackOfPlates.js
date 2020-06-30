// Chapter 3: Stacks & Queues
// Initially solved on LeetCode
//==============================================================================
/*

Question 3.3 - Stack of Plates:

Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
Therefore, in real life, we would likely start a new stack when the previous stack exceeds some
threshold. Implement a data structure SetOfStacks that mimics this. 
SetOfStacks should be composed of several stacks and should create a new stack 
once the previous one exceeds capacity.
SetOfStacks.push() and SetOfStacks.pop() should behave identically to a single stack
(that is, pop() should return the same values as it would if there were just a single stack).

  FOLLOW UP
  Implement a function popAt (int index) which performs a pop operation on a specific sub-stack.

R(ephrase): make data structure called SetOfStacks, that holds several stacks, and makes sure that one stack doesn't get "too full", and fills up the other stacks accordingly
Make methods for .push() and .pop() and eventually .popAt() where you can pick which stack to .pop() at

E(xample):

A(pproach):

C(ode):

*/

class SetOfStacks {
  constructor() {
    this.stacks = [[], [], []];
    this.limit = this.stacks.length;
  }
}
let helper = function (arr, val) {
  return arr.push(val);
};

SetOfStacks.prototype.push = function (val) {
  if (this.stacks[this.stacks.length - 1].length === this.limit) {
    throw new Error(
      'all available stacks are full - please use a new SetOfStacks'
    );
  }
  for (let i = 0; i < this.limit; i++) {
    if (this.stacks[i].length < this.limit) {
      return helper(this.stacks[i], val);
    }
  }
};

SetOfStacks.prototype.pop = function () {
  if (this.stacks[0].length === 0) {
    throw new Error('all stacks are empty - nothing to remove');
  }
  for (let i = this.limit - 1; i >= 0; --i) {
    if (this.stacks[i].length) {
      let currentStack = this.stacks[i];
      let removed = currentStack[currentStack.length - 1];
      currentStack.pop();
      return removed;
    }
  }
};

SetOfStacks.prototype.popAt = function (stackNum) {
  if (stackNum > this.limit - 1) {
    throw new Error(
      `there are not that many stacks in this set - please choose a stack number less than ${this.limit}`
    );
  }
  if (this.stacks[stackNum].length !== 0) {
    let stack = this.stacks[stackNum];
    let removed = stack[stack.length - 1];
    this.stacks[stackNum].pop();
    return removed;
  } else {
    throw new Error('the specified stack is already empty');
  }
};

// T(est):

let test = new SetOfStacks();
test.push(1);
test.push(2);
test.push(3);
test.push(4);
test.push(5);
test.push(6);
test.push(7);
test.push(8);
test.push(9);

//test.push(10);

console.log('full to 9: ', test); // expect SetOfStacks { { stacks: [ [1,2,3], [4,5,6], [7,8,9] ], limit: 3 } }
console.log('should return 6: ', test.popAt(1)); // expect return 6

test.pop();
console.log('popped last, now full to 8 and missing 6: ', test); // expect SetOfStacks { { stacks: [ [1,2,3], [4,5], [7,8] ], limit: 3 } }

test.push(6);
test.push(9);
console.log('pushed 6 then 9, now full to 9: ', test);

test.push(10); // expect Error

// O(ptimize): n/a
