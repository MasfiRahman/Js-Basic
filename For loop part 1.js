//A program to demonstrate for loop

// for loop syntax
/*for(starting;condition;update){

}*/

for (var i = 1; i <= 10; i++) {
 console.log("Bangladesh" + "<br>");
}

//document.write("End of for loop");
console.log("End of for loop");

// sum of numbers 1+2+..+100
var sum = 0;
for (var x = 1; x <= 100; x++) {
  sum = sum + x;
}
console.log("The sum is " + sum);


//1,3,5,7....99

for (var x = 1; x <= 99; x++) {
  console.log(" "+x);
}
console.log("<h1> End <h1/>");

//2,4,5,8...100

for(var x = 2; x <= 100; x = x+2 ){
    console.log(" "+x);
}
console.log("<h1> End <h1/>");

//1,2...10
for(var x = 1; x <= 10; x = x+1 ){
    console.log(" "+x);
}
console.log("<h1> End <h1/>");

//10,9,8.....1
for(var x = 10; x >= 1; x = x - 1 ){
    console.log(" "+x);
}
console.log("<h1> End <h1/>");
