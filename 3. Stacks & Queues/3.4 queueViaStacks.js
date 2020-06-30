// Chapter 3: Stacks & Queues
// Initially solved on LeetCode
//==============================================================================

/*

Question 3.4 - Queue VIA Stacks:

Implement a MyQueue class which implements a queue using 2 stacks.

R(ephrase): a queue is first-in-first-out, so whatever the class holds needs to be able to be accessed in that order, 
but using ONLY methods available to stacks (push, pop, peek, empty) to access it (i.e. can't use shift, slice... etc.)

E(xample):

MyQueue { this.q = [3,2,1] }

A(pproach):
in the example case we put the elements 1, 2, and 3, into this.q in that order
but to get them out, we need to also take them out in 1, 2, 3 order
but since we cannot use shift, we have to reverse the elements' order immediately upon pushing them in
put all items into a temp [] using pop, then put new push item into the temp [], then take all items and put back in this.q using pop
for peek we can then just look at this.q's last element
and for pop, we can take off that last element of this.q
it will return true for empty if this.q.length is 0, and return false if > 0

C(ode):

*/

var MyQueue = function () {
  this.q = [];
};

MyQueue.prototype.push = function (x) {
  const reverserStack = [];
  while (this.q.length > 0) {
    reverserStack.push(this.q.pop());
  }
  reverserStack.push(x);
  while (reverserStack.length > 0) {
    this.q.push(reverserStack.pop());
  }
};

MyQueue.prototype.pop = function () {
  return this.q.length > 0 ? this.q.pop() : undefined;
};

MyQueue.prototype.peek = function () {
  return this.q.length > 0 ? this.q[this.q.length - 1] : undefined;
};

MyQueue.prototype.empty = function () {
  return this.q.length === 0;
};

// T(est):

// let test = new MyQueue();

// test.push(1);
// test.push(2);
// test.push(3);
// test.push(4);
// test.push(5);

// console.log(test.peek()); // expect 1

// console.log(test.pop()); // expect 1
// console.log(test.empty()); // expect false
// console.log(test.pop()); // expect 2
// test; // expect MyQueue { stack: [5,4,3] }

// O(ptimize): n/a
