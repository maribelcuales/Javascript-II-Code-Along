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
  