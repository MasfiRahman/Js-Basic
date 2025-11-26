//! 🛠 🛠 Personal Budget Tracker Challenge (Phase 6 - loop control statement)

/*
📌 Challenge Requirements:
- Ask the user for their name and store it in a variable.
- Ask the user for their total income using prompt().
- Ask the user how many expenses they have, then use a loop to collect expense amounts dynamically.
- make sure to validate all the inputs
- Perform all calculations (tax, balance, savings, financial status).
- Show the results in the console.
*/

/*
📊 Personal Budget Tracker
User: Masfi
💰 Total Income: $5000
💸 Total Expenses: $2200
📉 Tax Deducted (10%): $500
💲 Net Income After Tax: $4500
🟢 Remaining Balance: $2300
💾 Savings (20% of balance): $460
⚠️ Needs Improvement. Consider reducing expenses.
*/

// Ask for user input dynamically
const userName = prompt('Enter your name: ');
const income = parseFloat(prompt('Enter your total income: '));

// Ask how many expenses the user has
const numberOfExpenses = parseInt(prompt('How many expenses do you have? '));

// validate inputes to ensure they are numbers

if (isNaN(income) ||isNaN(numberOfExpenses) ||income <= 0 ||numberOfExpenses < 0) {
  console.log('⚠️ Invalid input. Please enter valid numbers.');
} else {
  let totalExpenses = 0;

  // collect expenses dynamically
  for (let i = 1; i <= numberOfExpenses; i++) {
    let expense = parseFloat(prompt(`Enter expense ${i}: `));

    if (isNaN(expense) || expense < 0) {
      console.log(`⚠️ Invalid input for expense ${i}, setting it it $0`);
      expense = 0;
    }
    totalExpenses += expense;
  }

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
}
