//digit spelling
// A program to understand switch -> digit spelling program
// 0 -> Zero
// 1 -> One
// 2 -> Two
// ...
// ...
// 9 -> Nine
// if input is not a number then program will display "not a  digit" example:- input to 10 to show not a valid digit 

//Switch keywords are switch,case break ,default

var digit = parseInt(prompt("Enter a digit : "));
switch (digit) {
  case 0:
   //document.write("Zero");
   console.log("Zero");
    break;

  case 1:
    //document.write("One");
    console.log("One");
    break;

  case 2:
    //document.write("Two");
    console.log("Two");
    break;

  case 3:
    //document.write("Three");
    console.log("Three");
    break;

  case 4:
    //document.write("Four");
    console.log("Four");
    break;

  case 5:
    //document.write("Five");
    console.log("Five");
    break;

  case 6:
    //document.write("Six");
    console.log("Six");
    break;

  case 7:
    //document.write("Seven");
    console.log("Seven");
    break;

  case 8:
    //document.write("Eight");
    console.log("Eight");
    break;

  case 9:
    //document.write("Nine");
    console.log("Nine");
    break;

  default:
    //document.write("Not a digit");
    console.log("Not a Valid digit");
}