///////////    CLOSURE      ///////////

/* (MDN)
What is a closure?
Closures are an extremely powerful property of JavaScript (and most programming languages). As defined on MDN:

Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure ‘remembers’ the environment in which it was created.
*/

// # 1
function greetName(name) {
 	return {
		name: name,
		hello: function() {
		return `Hello, ${name}!`
		},
		niHao: function() {
		return `Ni Hao, ${name}!`;
		}
	}
}
  
let greetFunc = greetName('Luke');
console.log(greetFunc.hello());
  
greetFunc = greetName('Lizzy');
console.log(greetFunc.niHao());


// # 2 (Closures)
/*
A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain. The closure has three scope chains: it has access to its own scope (variables defined between its curly brackets), it has access to the outer function’s variables, and it has access to the global variables.

The inner function has access not only to the outer function’s variables, but also to the outer function’s parameters. Note that the inner function cannot call the outer function’s arguments object, however, even though it can call the outer function’s parameters directly.

You create a closure by adding a function inside another function.
*/

function sayHello(firstName, lastName) {
	const greeting = 'my name is ';
	function hello(){
		return 'Hello, ' + greeting + firstName + ' ' + lastName;
	}
	return hello();
}
  
console.log(sayHello('Daenerys', 'Targaryen'));
  
// # 3
// 1. Closures have access to the outer function’s variable even after the outer function returns:

function celebrityName (firstName) {
	var nameIntro = "This celebrity is ";
	// this inner function has access to the outer function's variables, including the parameter
 function lastName (theLastName) {
			return nameIntro + firstName + " " + theLastName;
	}
	return lastName;
}

var mjName = celebrityName ("Michael"); // At this juncture, the celebrityName outer function has returned.

// The closure (lastName) is called here after the outer function has returned above
// Yet, the closure still has access to the outer function's variables and parameter

console.log(mjName ("Jackson")); // This celebrity is Michael Jackson 


// # 4 
// 2. Closures store references to the outer function’s variables;

function celebrityID () {
	var celebrityID = 999;
	// We are returning an object with some inner functions
	// All the inner functions have access to the outer function's variables
	return {
			getID: function ()  {
					// This inner function will return the UPDATED celebrityID variable
					// It will return the current value of celebrityID, even after the changeTheID function changes it
				return celebrityID;
			},
			setID: function (theNewID)  {
					// This inner function will change the outer function's variable anytime
					celebrityID = theNewID;
			}
	}
}

var mjID = celebrityID (); // At this juncture, the celebrityID outer function has returned.
console.log(mjID.getID()); // 999

mjID.setID(567); // Changes the outer function's variable
console.log(mjID.getID()); // 567: It returns the updated celebrityId variable



