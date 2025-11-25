//1+2+3+4+5=

var sum = 0;

for(var x=1;x<=5;x=x+1){
    sum =sum+x;
}
console.log(sum);

//1+2+3+4+5+6+7+8+9+10=
var sum = 0;

for(var x=1;x<=10;x=x+1){
    sum =sum+x;
}
console.log(sum);

//5+6+7+8+9+10=
var sum = 0;

for(var x=5;x<=10;x=x+1){
    sum =sum+x;
}
console.log(sum);


// Sum of m to n numbers

var m = parseInt(prompt("Enter the String number : "));
var n = parseInt(prompt("Enter the last number : "));
var sum = 0 ;

for (var x = m ; x <= n ; x = x + 1){
    sum = sum + x;
}
console.log(sum);


// Running a program multiple times using for loop\

for(var x=1;x<=5;x++){
    var num1 = parseInt(prompt("Enter the first number : "));
    var num2 = parseInt(prompt("Enter the second number : "));
    var sum = num1+num2;
    console.log("Result = "+sum);
}