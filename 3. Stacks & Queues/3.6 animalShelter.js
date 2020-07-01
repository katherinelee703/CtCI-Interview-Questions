// Chapter 3: Stacks & Queues
// Originally solved on repl.it, please see: https://repl.it/@khd25/
//==============================================================================

/*

Question 3.6 - Animal Shelter:

An animal shelter, which holds only dogs and cats, operates on a strictly"first in, first
out" basis. People must adopt either the "oldest" (based on arrival time) of all animals at the shelter,
or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of
that type). They cannot select which specific animal they would like. Create the data structures to
maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog,
and dequeueCat. 

R(ephrase): people can choose type of animal but not specific animal to adopt. they are given the animal that has been in the shelter longest. if they specify dog or cat, they will be given the animal of that type that has been in the shelter the longest. Keep track of the animals in this system - basically make a Queue (FIFO) that does this

E(xample):
Animals going into the shelter in this order:
Natto(d), Yuki(c), Teddy(d), Leon(d), Yoru(c)

Person1 wants any animal: they get Natto
Person2 wants a cat: they get Yuki
Person3 wants a dog: they get Teddy
Person4 wants any animal: they get Leon
Person5 wants a dog: no more dogs
Person6 wants a cat: they get Yoru
Person6 wants any: no more cats or dogs, shelter is empty

A(pproach):
-set up a special queue for this shelter - it has a comprehensive animal list, a dogs only list, and cats only list
class methods will be: 
-enqueue() - puts animal into compl list, and whichever list the animal type is
-dequeueAny() - take out the "oldest" animal from comp list, and takes them out from whichever list the type is
-dequeueDog() - takes out "oldest" dog from dog list and from comp list
-dequeueCat() - takes out "oldest" cat from cat list and from comp list
-peek() - shows the animal that has been in shelter longest 
-isEmpty() - shows true once all animals have been adopted out

C(ode):

*/

class Queue {
  constructor() {
    this.q = [];
    this.dog = [];
    this.cat = [];
  }
  enqueue(val) {
    this.q.push(val);
    if (val.type === 'dog') {
      this.dog.push(val);
    }
    if (val.type === 'cat') {
      this.cat.push(val);
    }
  }
  dequeueAny() {
    if (this.q.length === 0) return -1;
    let adoptedAnimal = this.q.shift();
    if (adoptedAnimal.type === 'dog') {
      this.dog.shift();
    }
    if (adoptedAnimal.type === 'cat') {
      this.cat.shift();
    }
    return adoptedAnimal;
  }
  dequeueDog() {
    if (this.q.length === 0) return -1;
    if (this.dog.length === 0) return -1;
    for (let i = this.q.length - 1; i >= 0; i--) {
      if (this.q[i].type === 'dog') {
        this.q = this.q.slice(0, i) + this.q.slice(i + 1);
      }
    }
    return this.dog.shift();
  }
  dequeueCat() {
    if (this.q.length === 0) return -1;
    if (this.cat.length === 0) return -1;
    for (let i = this.q.length - 1; i >= 0; i--) {
      if (this.q[i].type === 'cat') {
        this.q = this.q.slice(0, i) + this.q.slice(i + 1);
      }
    }
    return this.cat.shift();
  }
  peek() {
    return this.q[0];
  }
  empty() {
    return this.q.length === 0;
  }
}

// T(est):

let shiba = {
  name: 'Natto',
  type: 'dog',
  breed: 'shiba',
  age: 3,
};

let poodle = {
  name: 'Teddy',
  type: 'dog',
  breed: 'poodle',
  age: 4,
};

let bichon = {
  name: 'Leon',
  type: 'dog',
  breed: 'bichon',
  age: 6,
};

let persian = {
  name: 'Yuki',
  type: 'cat',
  breed: 'persian',
  age: 5,
};

let ragdoll = {
  name: 'Yoru',
  type: 'cat',
  breed: 'ragdoll',
  age: 3,
};

let shelter = new Queue();
shelter.enqueue(shiba);
shelter.enqueue(persian);
shelter.enqueue(poodle);
shelter.enqueue(bichon);
shelter.enqueue(ragdoll);

console.log(shelter.dequeueAny()); // expect natto
console.log(shelter.dequeueAny()); // expect yuki
console.log(shelter.dequeueAny()); // expect teddy
console.log(shelter.dequeueAny()); // expect leon
console.log(shelter.dequeueDog()); // expect -1
console.log(shelter.dequeueCat()); // expect yoru
console.log(shelter.dequeueCat()); // expect -1
console.log(shelter.dequeueAny()); // expect -1
console.log(shelter); // expect Queue { q: '', dog: [], cat: [] }
console.log(shelter.empty()); // expect true

/* 

O(ptimize): in progress

enqueue - O(1);
dequeueAny - O(1);
dequeueDog - O(n)  // needs work
dequeueCat - O(n)  // needs work
peek - O(1)
empty - O(1)

*/
