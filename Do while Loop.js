//do while loop syntax
/*do{
    // code to be executed
    // update statement(increment/decrement)
}while(condition);*/

//Printing numbers from 1 to 10 using do while loop
var i = 1;
do{
     console.log(" "+i);
     i++;
}while(i<=10);

//Printing numbers fro 1 to 20 using do while loop
var i = 1;
do{
     console.log(" "+i);
     i++;
}while(i<=20);


// A program to demonstrate do while loop
// do while loop syntax
var i = 1;
do {
  console.log("Bangladesh" + "<br>");
  i++;
} while (i <= 10);

console.log("End of do while loop");

// sum of numbers 1+2+..+100
var sum = 0;
var x = 1;
do {
  sum = sum + x;
  x++;
} while (x <= 100);
console.log(sum);


// While Loop vs Do While Loop Description
/*
In a while loop, the condition is checked before the execution of the loop's body. If the condition is false at the beginning, the loop's body may not execute at all.
In a do while loop, the loop's body is executed at least once before the condition is checked. This guarantees that the loop's body will run at least once, even if the condition is false.
*/
