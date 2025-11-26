// IIFEs (Immediately Invokeable Function Expressions)

// (function display(message) {//Immediate function calling
//   console.log(message);
// })('hi');

// Function Expressions
var display2 = function displayMessage(msg) {//msg as a parameter to print message to calling message in function
  console.log(msg);
};
display2("I am message");

/* ( ) =>parenthese
 { } => curly braces
[ ] => square braces
 < > => angle brackets
 */