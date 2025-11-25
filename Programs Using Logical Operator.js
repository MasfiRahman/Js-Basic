var marks = parseInt(prompt("Enter Marks : "))

// checking the conditions Using Lgical && and || operator

//if(marks => 100 && marks <= 0)//This part is not equal beacuse the Two condition are not at the same time 
    //console.log("Invalid marks");
if(marks => 100 || marks <= 0) //This part is equal or beacause of it's all time either greater then or less then
    console.log("Invalid marks");   
else if (marks >= 80 && marks <= 100)
    console.log("A+");
else if (marks >= 70 && marks <= 79)
    console.log("A");
else if (marks >= 60 && marks <= 69)
    console.log("A-");
else if (marks >= 50 && marks <= 59 )
    console.log("B");
else if (marks >= 50 && marks <= 59)
    console.log("C");
else if (marks >= 40 && marks <= 49)
    console.log("D");
else
    console.log("Fail");

//Finding large 1 number among 3 number Using Logical and operator
var num1 = prompt("Enter num1 : ");
var num2 = prompt("Enter num2 : ");
var num3 = prompt("Enter num3 : ");

if (num1 > num2 && num1 > num3)
    console.log("large Number : "+num1);
else if (num2 > num1 && num2 > num3)
    console.log("large Number :  "+num2);
else
    console.log("large Number : "+num3);


//Vowel and Consonent

var letter1 = prompt("Enter a letter : ");

letter1 = letter1.toLowerCase();//Converting any Captial letter as a lower case letter

if (letter1 == "a" ||letter1 == "e" ||letter1 == "i" ||letter1 == "o" ||letter1 == "u")
      console.log("Vowel");
else
    console.log("Consonent");    


var letter2 = prompt("Enter a letter : ");

letter2 = letter2.toUpperCase();//Converting any Small letter as a Uppercase case letter

if (letter1 == "A" ||letter1 == "E" ||letter1 == "I" ||letter1 == "O" ||letter1 == "U")
      console.log("Vowel");
else
    console.log("Consonent");    


// A program that will find a letter is vowel or consonant
var letter = prompt("Enter a letter : ");

// convert any uppercase input into lower cause we set only lowercase letter in condition
letter = letter.toLowerCase();

// Now check the condition
if (
  letter == "a" ||
  letter == "e" ||
  letter == "i" ||
  letter == "o" ||
  letter == "u"
) {
  console.log("Vowel");
} else {
  console.log("Consonant");
}