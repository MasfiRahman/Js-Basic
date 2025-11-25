//! 🛠 Personal Budget Tracker Challenge (Phase 4 - Arithmetic operators)
/*
📌 Challenge Requirements:
Use arithmetic operators (+, -, *, /, %) to:
- Calculate total expenses by summing multiple expenses such as rent, groceries, transport, entertainment.
- Apply tax deduction (e.g., 10% of income).
- Calculate savings percentage (e.g., 20% of remaining balance).
- Update console output to display the new calculations.
*/

/*
🎯 Expected Console Output:
📊 Personal Budget Tracker
User: Mashrur Rahman Masfi
💰 Total Income: $5000
💸 Total Expenses: $2300
📉 Tax Deducted (10%): $500
💲 Net Income After Tax: $4500
🟢 Remaining Balance: $2200
💾 Savings (20% of balance): $440 
*/

const userName = 'Mashrur Rahman Masfi';
const income = 5000;

// Multiple expenses
let rent = 1200;
let groceries = 600;
let transport = 200;
let entertainment = 300;

// calculate the expenses
let totalExpenses = rent + groceries + transport + entertainment;

// Tax deduction (10% of income)
let tax = income * 0.10;

// Net income after the tax
let netIcome = income - tax;

// Calculate remaining balance
let balance = netIcome - totalExpenses;

// Savings (20% of remaining balance)
let savings = balance * 0.20;

console.log('📊 Personal Budget Tracker App');
console.log('User: ' + userName);
console.log('💰 Total Income: $' + income);
console.log('💸 Total Expenses: $' + totalExpenses);
console.log('📉 Tax Deducted (10%): $' + tax);
console.log('💲 Net Income After Tax: $' + netIcome);
console.log('🟢 Remaining Balance: $' + balance);
console.log('💾 Savings (20% of balance): $' + savings);
