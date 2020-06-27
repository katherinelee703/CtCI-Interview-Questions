// Chapter 3: Stacks & Queues
// Initially solved on LeetCode
//==============================================================================
/*

Question 3.2 - Min Stack:

How would you design a stack which, in addition to push and pop, has a function min
which returns the minimum element? Push, pop and min should all operate in 0(1) time.

R(ephrase): design a stack that keeps track of the minimum currently within the stack

E(xamples):
MinStack class is holding all values in an array, and is holding an array of running minimums
so MinStack will contain something like this after it has been pushed into:
this.stack = [5,2,7,1,9]
this.min = [5,2,1]

MinStack.prototype.push(-3) should make:
this.stack = [5,2,7,1,9,-3]
and this.min = [5,2,1,-3]

MinStack.prototype.pop() should make:
this.stack = [5,2,7,1,9]
and this.min = [5,2,1]
and return this.min[this.min.length-1], which is -3

so myStack.prototype.getMin() should return this.min's last item, which is now 1
and myStack.prototyp.top() should return this.stack's last item, which is now 9

A(pproach):
- my MinStack class has a this.stack, and a this.min both initialized as empty arrays
- make prototype method for .push() which pushes any value into this.stack, the first value also into this.min, and checks all subsequent pushed values against current ths.min[this.min.length-1] and pushes to this.min if smaller
- make prototype method for .pop() which removes the last element from this.stack, and also removes the last element from this.min if the last value is the last value of this.min too. it also returns the removed item
- make prototype method for .top() which just reads the this.stack and returns the item at .length-1
- make prototype method for .getMin() which just reads this.min and returns the item at .length-1

C(ode):

*/
class MinStack {
  constructor() {
    this.min = [];
    this.stack = [];
  }
}

MinStack.prototype.push = function (x) {
  if (this.min.length === 0 || x <= this.min[this.min.length - 1])
    this.min.push(x);
  this.stack.push(x);
};

MinStack.prototype.pop = function () {
  var val = this.stack.pop();
  if (val === this.min[this.min.length - 1]) this.min.pop();
};

MinStack.prototype.top = function () {
  return this.stack.length ? this.stack[this.stack.length - 1] : 0;
};

MinStack.prototype.getMin = function () {
  return this.min.length ? this.min[this.min.length - 1] : 0;
};

// T(est):

let test = new MinStack();
test.push(3);
test.push(2);
test.push(5);
test.push(6);
test.push(1);
test.pop();

console.log(test.getMin());

// O(ptimize):
// no need to optimize, all methods operate in O(1) constant time
