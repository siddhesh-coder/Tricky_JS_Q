Note:
//diff Q

console.log("start");

const promise = new Promise((resolve, reject)=>{
    console.log(`${2} I am not async`);
    resolve(`${4} I log last because I am async, you must know event loop to understand me`);
})
.then(res => console.log(res));
   
console.log("end");

//output well be 
/*
start
2
end

because console.log(2) is not async, though it is under promise it is a sync thats why.*/



//Q 1
/*In JavaScript, variable declarations using the var keyword are hoisted 
to the top of their containing scope during the compilation phase. 
However, only the declarations are hoisted, not the initializations. 
This means that the variable is moved to the top of the scope, 
but its value is not assigned until the actual line of code is executed.*/
// console.log("Value of Age is", age);
// var age = 20;
// console.log("Value of Age is", age);

//for ex like this
// var age;
// console.log("Value of Age is", age);
// age = 20;
// console.log("Value of Age is", age);

//Q2
/*Here code will neither give 100 nor 30 because here we are using let
and if we create a variable using let we cannot access it before creation because 
let is above creates Temporal dead zone due to which we cannot access it, hence this will
give ReferenceError!*/

// age = 100;
// console.log("Value of Age is", age);
// let age = 30;

//Q3
/*First Function Call (myFun();):

The myFun function is called before its declaration or initialization.
Due to hoisting, the function declaration function myFun() {...} is moved to the top of the scope.
Therefore, the first function call outputs "Second."
Variable Declaration (var myFun = function () {...};):

The variable myFun is declared using the var keyword and assigned a function expression.
Function expressions are not hoisted in the same way as function declarations, so the assignment is not moved to the top.
At this point, myFun is still a function due to the previous declaration, but now it refers to the function expression*/

// myFun();
// var myFun = function (){
//   console.log("first");
// };
// myFun();

// function myFun(){
//   console.log("Second");
// }
// myFun();


//Q4

// var variable = 10;

// (() => {
//   console.log(variable);
//   variable = 20;
//   console.log(variable);
// })()

// console.log(variable);
// var variable = 30;


//Q5
 //also called named IIFE
// (function fn(name){
//   console.log(name);
// })("sidd"); //keep in mind to give here a semicolon

// //also called unnamed IIFE
// (()=>{
//   console.log("IIFE");
// })();

// //IIFE could be like this also
// (function(greet){
//   console.log(greet);
// })("hi")

//Q6

// for (let index = 0; index < 10; index++) {
//   setTimeout(()=>{console.log(index)},0);
// }

// for (let index = 0; index < 10; index++) {
//   setTimeout(()=>{console.log(index)},0);
// }


//Q7

// var fullname = "Harry";

// var obj = {
//   fullname: "Full name",

//   prop: {
//     fullname: "Inside Prop",
//     getFullname: function(){
//       return this.fullname;
//     }
//   },

//   getFullname: function(){
//       return this.fullname;
//   },

//   getFullnameA: () => this.fullname,

//   getFullnameA1: (function(){
//                     return this.fullname;
//                   })(),
// };
// console.log(obj.prop.getFullname());
// console.log(obj.getFullname());
// console.log(obj.getFullnameA());
// console.log(obj.getFullnameA1());

//Q8

// const harry = {
//   name: 'harry',
//   sayName: function(){
//     console.log(this.name);
//   },
// };

// const jhon = {
//   name: 'jhon Doe',
//   sayName: function(){
//     console.log(this.name);
//   },
// };

// jhon.sayName.call(harry);

//Q9
/* The sayName function is passed directly to setTimeout. 
However, when the sayName function is invoked by setTimeout, 
the this context within the function is no longer the harry object. 
It becomes the global object (or undefined in strict mode), 
which means this.name is undefined or results in an error.
To fix this, you can use bind method to explicitly set the this context*/

// const harry = {
//   name: 'harry',
//   sayName: function(){
//     console.log(this.name);
//   },
// };
// setTimeout(harry.sayName,2*1000); //will not print

// const jhon = {
//   name: 'jhon Doe',
//   sayName: function(){
//     console.log(this.name);
//   },
// };

// const newFn = jhon.sayName.bind(jhon);
// setTimeout(newFn, 2*1000);

//Q10

const obj = {
  val: 30,
};

console.log(obj.val);
delete obj.val;
console.log(obj.val);

/*With Object.create, you create a new object with a specified prototype. 
In this case, the prototype has a property named value with a value of 30. 
The delete operation is used to remove the value property from the object. 
However, even after the delete operation, accessing object.value still gives the value 30.
This happens because the value property is part of the prototype chain. When you delete a property using delete, 
it only removes the property from the object itself, not from its prototype chain. 
So, the property is still accessible from the prototype.*/

const object = Object.create({
  value: 30,
});

console.log(object.value);
delete object.value;
console.log(object.value);

//PhonePe interview Quetion on object

//shallow copy
const person1 = {
  name: "dummy1",
  address: {
    line1: "Pune",
    line2: "Banglore",
  },
};

//const person2 = { ...person1 };

//How to pervent shallow copy
const person2 = JSON.parse(JSON.stringify({ ...person1 }));

person1.name = "anil";
person1.address.line1 = "goa";

console.log(person1);
console.log(person2);

//this keyword Question

var length = 10;
function fn(){
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function (fn){
    fn();
    arguments[0]();
  },
};
obj.method(fn, 1);

//output will be 10 2

//! note: Node doesnt have a this context in global scope. Browser has this == window in global scope, so it will give you correct output in browser.

var a = 10;
const obj = {
  a: 13,
  geta: function () {
    function inner() {
      console.log(this.a);
    }
  },
};
obj.geta();
console.log(a);

//How to make try catch wrapper class

function wrapper(fn) {
  return function (...args) {
    try {
      return fn(...args);
    } catch (error) {
      return "Error";
    }
  };
}

function add(a, b) {
  return a + b;
}

const wrapperOne = wrapper(add);

const res = wrapperOne(3, 5);
console.log(res);

