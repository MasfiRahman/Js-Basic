

//! 🛠 Personal Budget Tracker Challenge (Phase 3 - Operators: calculate the remaining balance)
// Challenge Overview:Create a basic personal budget tracker that allows users to enter their incomes and expenses, and then displays their remaining balance using the console. Later, we will extend this project by adding functions, arrays, objects, and DOM manipulation.

// 📌 Challenge Requirements:
/*
Declare variables for:
User's name (string)
single Income amount (number)
multiple Expense amount (number)
Remaining balance (calculated)
Use console.log() to:
Display the user’s name.
Show the income, expenses, and balance.
Format the output neatly.
Add comments to explain calculation
*/

// Declare variables
let userName = 'Masfi'; // String
let income = 3750.25; // Number
let expenses1 = 2580.5; // Number
let expenses2 = 2580.5; // Number
let balance = income - expenses1 - expenses2; // Calculation using Arithmatic Operator

// Display the budget details in console
console.log('📊 Personal Budget Tracker');
console.log('User: ' + userName);
console.log('User: ' + userName.toUpperCase());//Using String Library Functions
console.log('💰 Total Income: $' + income);
console.log('💸 Total Expenses: $' + expenses);
console.log('🟢 Remaining Balance: $' + balance);//Using Arithmatic Operator
