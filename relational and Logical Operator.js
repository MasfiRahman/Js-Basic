// Relational Operator : >, >=, <, <=,==,===,!=,!==
//  ==(for checking only value), ===(for checking value and data type), !=, !==
// Logical Operator : &&, ||, !

// Relational and logical operators return true / false

var num1 = 20;
var num2 = 10;
var num3 = "10";
var num4 = 20;
var num5 = 15;

console.log(num1 > num2);
console.log(num1 >= num2);
console.log(num1 < num2);
console.log(num1 <= num2);
console.log(num1 == num4);
console.log(num1 != num4);
console.log(num1 === num3);
console.log("num2 === num3 : " + (num2 === num3));
console.log("num2 == num3 : " + (num2 == num3));
console.log(num1 !== num3);

// logical operators helps us to compine multiple conditions
console.log(num1 > num2 && num1 > num5);//Logical Operator and Relational Operator mixed 
console.log(num1 > num2 && num5 > num2);//Logical Operator and Relational Operator mixed 
console.log(num1 > num2 || num1 > num5);//Logical Operator and Relational Operator mixed 
console.log(num5 > num4 || num2 > num3);//Logical Operator and Relational Operator mixed 

console.log(!true);
console.log(!false);
console.log(!(20>15));
console.log(!(20<15));