// Chapter 2: Linked Lists
// Solutions originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/* 

Question 2.7 - Intersection

Given two (singly) linked lists, determine if the two lists intersect. Return the intersecting
node. Note that the intersection is defined based on reference, not value. That is, if the kth
node of the first linked list is the exact same node (by reference) as the jth node of the second
linked list, then they are intersecting.
 
R(ephrase):

Given 2 SLL, check each node to see if the lists share any node that occupies the same reference in memory.
If so, that means the 2 lists have the same items in them from a certain point onward. (they form a Y shape).
If not, they are 2 separate lists.

E(xample):

Input:
List A:          |1|->|2|->|NULL|
                /
List B:    |4|->

Output (the node where intersection happens):
ListNode { val: 1, next: ListNode {val: 2, next: null} }

//======================

Input:
List C: |5|->|NULL|

List D: NULL

Output: null;


Test section below matches the above 2 examples

*/

function ListNode(val) {
  this.val = val;
  this.next = null;
}

var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  var pointer1 = headA;
  var pointer2 = headB;
  while (pointer1 && pointer2 && pointer1 !== pointer2) {
    pointer1 = pointer1.next;
    pointer2 = pointer2.next;

    if (pointer1 == pointer2) return pointer1;
    if (!pointer1) pointer1 = headB;
    if (!pointer2) pointer2 = headA;
  }
  return pointer1;
};

// T(est):

let myA = new ListNode(1);
myA.next = new ListNode(2);

let myB = new ListNode(4);
myB.next = myA;

let myC = new ListNode(5);
let myD = null;

let myE = new ListNode(5);
myE.next = new ListNode(2);
let myF = new ListNode(3);

console.log('A & B Intersection: ', getIntersectionNode(myA, myB)); // expect node with val 1, then 2, then null
console.log('C & D Intersection: ', getIntersectionNode(myC, myD)); // expect null
console.log('E & F Intersection: ', getIntersectionNode(myE, myF)); // expect null

// O(ptimize):
// see line 50
// O(N+M) time, O(1) space
