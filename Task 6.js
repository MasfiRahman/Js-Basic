/* Program for Task 6*/
// A program that will find sum of all numbers from 1 to 100 that are divisible by 3 and 5 from 1 to 100 

var sum = 0;
var i = 1;
while (i <= 100) {
    if (i % 3 == 0 && i % 5 == 0) {
        sum = sum + i;
    }
    i = i + 1;
}
console.log("sum is : " + sum);
console.log("<h1>End</h1>");


// A program that will find sum of all numbers from 1 to 20 that are divisible by 3 and 5 from 1 to 20

var sum = 0;
var i = 1;
while (i <= 20) {
    if (i % 3 == 0 && i % 5 == 0) {
        console.log(" " + i + "<br/>");
        sum = sum + i;
    }
    i = i + 1;
}
console.log("sum is : " + sum);
console.log("<h1>End</h1>");

// A program that will find sum of all numbers from 1 to 50 that are divisible by 3 and 5 from 1 to 50

var sum = 0;
var i = 1;
while (i <= 50) {
    if (i % 3 == 0 && i % 5 == 0) {
        console.log(" " + i+ "<br/>");
        sum = sum + i;
    }
    i = i + 1;
}
console.log("sum is : " + sum);
console.log("<h1>End</h1>");
