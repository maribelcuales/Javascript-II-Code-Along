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


/*
3. Closures Gone Awry
Because closures have access to the updated values of the outer function’s variables, they can also lead to bugs when the outer function’s variable changes with a for loop. 
 
The closure (the anonymous function in this example) has access to the outer function’s variables by reference, not by value. 

To fix this side effect (bug) in closures, you can use an Immediately Invoked Function Expression (IIFE).
*/

function celebrityIDCreator (theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
        theCelebrities[i]["id"] = function (j)  { // the j parametric variable is the i passed in on invocation of this IIFE
            return function () {
                return uniqueID + j; // each iteration of the for loop passes the current value of i into this IIFE and it saves the correct value to the array
            } () // BY adding () at the end of this function, we are executing it immediately and returning just the value of uniqueID + j, instead of returning a function.
        } (i); // immediately invoke the function passing the i variable as a parameter
    }

    return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];

var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

var stalloneID = createIdForActionCelebs [0];
console.log(stalloneID.id); // 100

var cruiseID = createIdForActionCelebs [1];
console.log(cruiseID.id); // 101


///////////    CALLBACKS      ///////////
/* 
Callback functions are just functions that are passed into other functions as arguments. 
*/

const functionFeeder = function(callback) {
	callback('Hello from the inside of Function Feeder');
  };
  
functionFeeder((string) => { // invoking the function
	alert(string); // alert a function that pops up a box in the browser.
});
  
/*
functionFeeder respectively becomes what is known as a higher-order function or a callBack function, allowing it to take in a function as a parameter and executes a function when called with a function as the argument.

functionFeeder respectively becomes what is known as a higher-order function or a callBack function, allowing it to take in a function as a parameter and executes a function when called with a function as the argument.
*/
  
// Example
function sayHello(name) {
console.log(`Hello, ${name}`);
}

function callSayHelloWithLars(callback) {
const innerName = 'Lars';
callback(innerName);
}

callSayHelloWithLars(sayHello);

function callSayHelloWithRyan(callback) {
const newName = 'Ryan';
callback(newName);
}

callSayHelloWithRyan(sayHello);


///////////    CALLBACKS IN ARRAY      ///////////

const items = ['feather', 'coupon', 'cup', 'drill'];

// We could use a native for loop to loop over this list and log out every item.
/*
for(let i = 0; i < items.length; i ++) {
  alert(items[i]);
}
*/

// OR 
// items.forEach(item =>  alert(item) );   
// NOTICE this part is the callback item => alert(item)

// FOLLOW ALONG
// Remember that with functions we can pass as many parameters as we want to them. 

const elements = ['earth', 'wind', 'fire', 'water'];



//Create a function called show first that passes back the first item 
// in the given array.


function showFirst(array, callback) {
  callback(array[0]);
}

showFirst(elements, (firstItem) => {
  alert(firstItem);
});



// Create a function like ‘showFirst’, but this time, show the length 
// of the array passed.

function showLength(array, callback) {
  callback(array.length);
}

showLength(elements, (length) => {
  alert(length);
});

// Now, let’s use forEach again to loop over our array and alert each item in the array.

elements.forEach(element => alert(element));

// The most significant difference between .forEach and .map is that map returns a new array of elements while in turn passing each element back to the callback.

//const newArray = elements.map(item => ‘Element: ‘ + item);


// EXERCISE/ CHALLENGE

/*
  Problem 1: Greet
  Create a function called `greet` that takes in a 'name' parameter
  simply use that function to alert the name provided;
  Next, create a function called `greetCaller` that takes a callback parameter
  our greetCaller function should declare a name variable and pass it to the callback.
  Invoke greetCaller with greet passed into it.
*/

// code greet here.
function greet(name) {
  console.log(name);
}

function greetCaller(callback) {
  const caller = 'Aurora';
  callback(caller);
}

greetCaller(greet);


/*
  Problem 2: forEach
  use .forEach to loop over the simpsons list and alert each name passed back to your anonymous callback to the console. 
*/

const simpsons = ['Marge', 'Lisa', 'Homer', 'Bart', 'Maggie'];

// code for `forEach` goes here
//simpsons.forEach(item => alert(item)); 


/*
  Problem 3: every
  create a function called `every` that takes in an array and a callback as it's parameters
  loop over every single item (using a native for loop) and pass each item to the callback
  When you're done, make sure that you finish the code inside of `every` and ensure it works the way it's supposed to
*/

// every(simpsons, (/* don't forget your items */) => {
   // fill this in.
   // log ieach item that comes back to the console.
// });

function every(array, callback) {
  callback(array);
}

every(simpsons, (items) => {
  for(let i = 0; i < simpsons.length; i++) {
  console.log(simpsons[i]);
  }
})


// OR WRITE IT LIKE THIS:  
/*
function arrayLoop(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

every(simpsons, arrayLoop);
*/


///////////    ADVANCED ARRAY METHODS      ///////////

//The .map .filter and .reduce functions are commonly used to achieve immutability and take a set of data and transform it in some way.

const data = [
  {"city":"seattle", "state":"WA", "population":652405, "land_area":83.9},
  {"city":"new york", "state":"NY", "population":8405837, "land_area":302.6},
  {"city":"boston", "state":"MA", "population":645966, "land_area":48.3},
  {"city":"kansas city", "state":"MO", "population":467007, "land_area":315}
];

// *****   .map   *****
// Task 1: Map the data to a new array, with objects of just city and state names. We could achieve this (and any of our tasks the traditional way)

const cityStates = [];
for(let i = 0; i < data.length; i++) {
  let mappedObj = {};
  mappedObj.city = data[i].city;
  mappedObj.state = data[i].state;
  cityStates.push(mappedObj);
  mappedObj = {};
}

// BETTER: 
const mappedCityStates = data.map((state) => {
  return {'city': state.city, 'state': state.state};
});

// Remember that our map function takes in a callback that passes back a couple of things to us. The three things you’d get back from a callback passed to Map would be:

// 1. The current item of the array: state
// 2. The current index of the current item: index
// 3. The entire array: data

const mappedCityStates2 = data.map((state, index, data) => {
  return {'city': state.city, 'state': state.state};
});

console.log(mappedCityStates2);


// *****   .filter   *****
// Task 2: Return states who’s population is greater than 650,000.  

// Remember that filter returns an item that passes what is called a truth test. Its really straight forward, but requires a bit of formal logic. Lets take the naive solution first:

const largeStates = [];
for(let i = 0; i < data.length; i++) {
  if(data[i].population >= 650000) {
    largeStates.push(data[i]);
  }
}

// BETTER: Same results and cleaner code.
const filterLargeStates = data.filter((state) => {
  return state.population >= 650000;
});
console.log(filterLargeStates);

// On this line return state.population >= 650000; we are explicitly returning an object whose population is higher than 650,000, and in turn, passing that object to a new array. 
// So the other objects will be ignored if they don’t pass this logic test. 
// Think of that line reading like this: IF state.population is greater than or equal to 650000 then push it into a new array else do nothing.


// *****   .reduce   *****
// Gives us access to a ‘reduced’ set of information about our data.
// USE: If we want our data reduced to a single value, we can aggregate that data and use .reduce to do so for us. 


// Task 3: We want a single number of all of the state’s populations added together.

let statePopulations = 0;
for(let i = 0; i < data.length; i++) {
  statePopulations += data[i].population;
}

// BETTER:

const reduceStatePopulations = data.reduce((total, state) => {
  return total += state.population;
}, 0);

console.log(reduceStatePopulations);

// First of all, we’re passing 0 as a second argument to our reduce function. 
// This argument will become the starting value of our total and, if not provided, would default to the first item in the array.

// In this case, that would be disastrous because the first item of our array is an object, and we’re trying to reduce our total to a single numerical value. 

// Instead, we can provide a starting value for total and thus set what our data type will reduce to. Remember that total also gets remembered by our function each pass.

// The four items that get passed back from our callback function when using .reduce are:

// The current value of the total aggregated value.
// We set the initial value at the end of the function. In this case, we set it to 0.
// (This could be any value, though.)
// The current item in the array.
// The index again.
// The full array.


// FOLLOW ALONG: 

const cityData = [
  {"city":"seattle", "state":"WA", "population":652405, "land_area":83.9},
  {"city":"new york", "state":"NY", "population":8405837, "land_area":302.6},
  {"city":"boston", "state":"MA", "population":645966, "land_area":48.3},
  {"city":"kansas city", "state":"MO", "population":467007, "land_area":315}
];

// Use .map to create an array of integers that represent all the states populations.

const statePopulation = cityData.map((item) => {
  return item.population; 
}) 

console.log(statePopulation);


// Use .filter to create an array of states who’s land_area is larger than 50 units.

const filteredStates = cityData.filter((state) => {
  return state.land_area >= 50;
})

console.log(filteredStates);


// Use .reduce to create an array of the states land_area reduced to the mean average of all the state’s combined.

const sumLandArea = cityData.reduce((total, state) => {
  return total += state.land_area; 
}, 0);

console.log(sumLandArea);

const averageLandArea = sumLandArea / cityData.length; 
  
console.log(averageLandArea);




