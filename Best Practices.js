//Best Practices
//Use camelCase for naming
//Variable declaretion on top and initialize
//Avoid unnecessary variables
//Swicth,Case,Default
//Object and Array with const
// = vs ==
// Access DOM less

/*
1. Naming Convention: Use camelCase
In JavaScript, the standard convention for naming variables and functions is camelCase. The first word is lowercase, and the first letter of every subsequent word is capitalized.

❌ Bad Practice:

JavaScript

let Firstname = "Rahim";  // PascalCase (Used for Classes, not variables)
let last_name = "Uddin";  // snake_case (Common in Python, not JS)

function userdata() {     // Hard to read
    // code
}
✅ Best Practice:

JavaScript

let firstName = "Rahim";
let lastName = "Uddin";

function getUserData() {
    // code here
}
2. Variable Declaration on Top & Initialize
It is a good habit to declare all variables at the beginning of the script or function. It keeps the code clean and prevents potential errors with undefined variables.

❌ Bad Practice:

JavaScript

let x = 5;
console.log(x);

// After many lines of code...
let y = 10; 
console.log(y);
✅ Best Practice:

JavaScript

// Declare and initialize everything at the top
let x = 5;
let y = 10;
let userName = ""; // Good to set a default value

console.log(x);
console.log(y);
3. Avoid Unnecessary Variables
Creating variables that are not needed consumes extra memory. If a value is used only once or can be returned directly, do not store it in a new variable.

❌ Bad Practice:

JavaScript

function add(a, b) {
    let sum = a + b; // This variable is redundant
    return sum;
}
✅ Best Practice:

JavaScript

function add(a, b) {
    return a + b; // Return the result directly
}
4. Switch, Case, Default
When you have many conditions to check, a switch statement is often cleaner and faster than a long chain of if...else if. Always include a default case to handle unexpected values.

❌ Bad Practice (Too many if-else):

JavaScript

let day = 1;
if (day == 0) {
    console.log("Sunday");
} else if (day == 1) {
    console.log("Monday");
} 
// ... continues for all days
✅ Best Practice (Using Switch):

JavaScript

let day = 1;

switch(day) {
    case 0:
        console.log("Sunday");
        break;
    case 1:
        console.log("Monday");
        break;
    default:
        console.log("Invalid Day"); // Always handle unknown cases
}
5. Object and Array with const
Always use const when declaring Arrays or Objects. This prevents accidental reassignment of the entire variable (changing the reference type), while still allowing you to modify the contents inside.

❌ Bad Practice (Using let):

JavaScript

let numbers = [10, 20];
numbers = [30, 40]; // You might accidentally wipe the original array
✅ Best Practice (Using const):

JavaScript

const numbers = [10, 20];

// You CAN modify the contents
numbers.push(30); 
console.log(numbers); // [10, 20, 30]

// You CANNOT replace the whole array (Safety feature)
// numbers = [50, 60]; // This will throw an Error
6. = vs == vs ===
= is for Assignment.

== checks Value only (ignores type).

=== checks Value AND Type. Always use === strictly to avoid logic bugs.

❌ Bad Practice (Using ==):

JavaScript

let num = 10;
let strNum = "10";

// Returns TRUE, even though one is a Number and one is a String
if (num == strNum) { 
    console.log("Equal"); 
}
✅ Best Practice (Using ===):

JavaScript

let num = 10;
let strNum = "10";

// Returns FALSE, because the types are different
if (num === strNum) {
    console.log("Equal");
} else {
    console.log("Not Equal"); // Correct logic
}
7. Access DOM Less
Accessing the HTML DOM (Document Object Model) is "expensive" (slow) for the browser. Avoid querying the DOM (e.g., document.getElementById) repeatedly inside loops.

❌ Bad Practice (Querying inside a loop):

JavaScript

for (let i = 0; i < 5; i++) {
    // The browser has to search the HTML document 5 times
    document.getElementById("demo").innerHTML += i; 
}
✅ Best Practice (Cache the element):

JavaScript

// Find the element once and store it in a variable
const demoElement = document.getElementById("demo"); 

for (let i = 0; i < 5; i++) {
    // Reuse the variable (Much faster)
    demoElement.innerHTML += i; 
}
*/