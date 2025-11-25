  //! 🛠 Personal Budget Tracker Challenge (Phase 5 - conditional control statement)
/*
📌 Challenge Requirements:
Use if,else, relational operators:

Use if-else conditions to categorize the user’s financial status based on savings:

Excellent: If savings ≥ $1000
Good: If savings are between $500 - $999
Needs Improvement: If savings are between $100 - $499
Critical: If savings < $100
Use if-else conditions to determine if the user is overspending:

Show a warning if expenses are greater than income.
Enhance Console Output to display the user’s financial health status.
*/

/*
🎯 Expected Console Output:
📊 Personal Budget Tracker
User: Masfi Rahman
💰 Total Income: $5000
💸 Total Expenses: $2300
📉 Tax Deducted (10%): $500
💲 Net Income After Tax: $4500
🟢 Remaining Balance: $2200
💾 Savings (20% of balance): $440
*/

// '⚠️ Warning: You are spending more than your income!';

const userName = 'Masfi Rahman';
const income = 5000;

// Multiple expenses
const rent = 4200;
const groceries = 600;
const transport = 200;
const entertainment = 300;

// calculate the expenses
const totalExpenses = rent + groceries + transport + entertainment;

// Tax deduction (10% of income)
const tax = income * 0.1;

// Net income after the tax
const netIcome = income - tax;

// Calculate remaining balance
const balance = netIcome - totalExpenses;

// Savings (20% of remaining balance)
const savings = balance * 0.2;

// Determine the financial health status
let finalStatus = '';
if (savings >= 1000) {
  finalStatus = '💰 Excellent! You are saving well!';
} else if (savings >= 500) {
  finalStatus = '✅ Good! You have a decent savings amount.';
} else if (savings >= 100) {
  finalStatus = '⚠️ Needs Improvement. Consider reducing expenses.';
} else {
  finalStatus = '🚨 Critical! Your savings are too low!';
}

// Check if expenses exceed income
let overspendingMessage = '';
if (totalExpenses > income) {
  overspendingMessage = '⚠️ Warning: You are spending more than your income!';
}

console.log('📊 Personal Budget Tracker App');
console.log(`User: ${userName}`);
console.log(`💰 Total Income: $${income}`);
console.log(`💸 Total Expenses: $${totalExpenses}`);
console.log(`📉 Tax Deducted (10%): $${tax}`);
console.log(`💲 Net Income After Tax: $${netIcome}`);
console.log(`🟢 Remaining Balance: $${balance}`);
console.log(`💾 Savings (20% of balance): $${savings}`);
console.log(finalStatus);
if (overspendingMessage) {
  console.log(overspendingMessage);
}
