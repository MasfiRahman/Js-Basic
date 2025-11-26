//@ts-nocheck
//! 🛠 🛠 Personal Budget Tracker Challenge (Phase 8 - Function)

/*
📌 Challenge Requirements:
Use multiple small functions for:
- Getting user input (text & number)
- Handling expenses (getting expenses, calculating total expenses)
- Performing financial calculations (tax, net income, balance, savings)
- Determining financial status
- Displaying results in a structured format
*/

// Function to get user input

function getUserInput(promptMessage, isNumber = false) {
  const userInput = prompt(promptMessage);
  return isNumber ? parseFloat(userInput) : userInput;
}

function getExpenses(numberOfExpenses) {
  const expenses = [];
  // collect expenses dynamically
  for (let i = 1; i <= numberOfExpenses; i++) {
    let expense = getUserInput(`Enter expense ${i}: `, true);
    if (isNaN(expense) || expense < 0) {
      console.log(`⚠️ Invalid input for expense ${i}, setting it it $0`);
      expense = 0;
    }
    expenses.push(expense);
  }
  return expenses;
}

function calculateTotalExpenses(expenses) {
  // Calculate total expenses using the array
  let totalExpenses = 0;
  for (let index = 0; index < expenses.length; index++) {
    totalExpenses += expenses[index];
  }
  return totalExpenses;
}

function calculateTax(income, taxRate) {
  return income * taxRate;
}
function calculateNetIncome(income, tax) {
  return income - tax;
}
function calculateBalance(netIcome, totalExpenses) {
  return netIcome - totalExpenses;
}
function calculateSavings(balance, savingPercentage) {
  return balance * savingPercentage;
}
function getFinancialStatus(savings) {
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
  return finalStatus;
}

function displayResults(
  userName,
  income,
  totalExpenses,
  tax,
  netIncome,
  balance,
  savings,
  finalStatus
) {
  console.log('📊 Personal Budget Tracker App');
  console.log(`User: ${userName}`);
  console.log(`💰 Total Income: $${income}`);
  console.log(`💸 Total Expenses: $${totalExpenses}`);
  console.log(`📉 Tax Deducted (10%): $${tax}`);
  console.log(`💲 Net Income After Tax: $${netIncome}`);
  console.log(`🟢 Remaining Balance: $${balance}`);
  console.log(`💾 Savings (20% of balance): $${savings}`);
  console.log(finalStatus);

  const overspendingMessage = checkOverSpending(income, totalExpenses);
  if (overspendingMessage) {
    console.log(overspendingMessage);
  }

  console.log('📝 Expense Breakdown:');
  for (let index = 0; index < expenses.length; index++) {
    console.log(`Expense ${index + 1} : $${expenses[index]}`);
  }
}

function checkOverSpending(income, totalExpenses) {
  // Check if expenses exceed income
  return totalExpenses > income
    ? '⚠️ Warning: You are spending more than your income!'
    : '';
}

// Main function to the run the budget tracker
function runBudgetTracker() {
  // Ask for user input dynamically
  const userName = getUserInput('Enter your name: ');
  const income = getUserInput('Enter your total income: ', true);

  // Ask how many expenses the user has
  const numberOfExpenses = getUserInput(
    'How many expenses do you have? ',
    true
  );

  // validate inputes to ensure they are numbers
  if (
    isNaN(income) ||
    isNaN(numberOfExpenses) ||
    income <= 0 ||
    numberOfExpenses < 0
  ) {
    console.log('⚠️ Invalid input. Please enter valid numbers.');
    return;
  } else {
    const expenses = getExpenses(numberOfExpenses);
    const totalExpenses = calculateTotalExpenses(expenses);
    // Tax deduction (10% of income)
    const tax = calculateTax(income, 0.1);

    // Net income after the tax
    const netIncome = calculateNetIncome(income, tax);

    // Calculate remaining balance
    const balance = calculateBalance(netIncome, totalExpenses);

    // Savings (20% of remaining balance)
    const savings = calculateSavings(balance, 0.2);

    // Determine the financial health status
    let finalStatus = getFinancialStatus(savings);

    displayResults(
      userName,
      income,
      totalExpenses,
      tax,
      netIncome,
      balance,
      savings,
      finalStatus
    );
  }
}

runBudgetTracker();
