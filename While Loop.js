//While Loop syntax are given blow:-

//Starting ponit
//while(condition){
    //code to be executed
    //update statement
//}


//Printing numbers form 1 to 100 using while loop
var i =1;

while(i<=100){

    console.log(" "+i);
    i = i + 1;
}
console.log("<h1>End</h1>");

//Sum of All numbers from 1 to 10 using while loop
//1+2+3+......+10=

var i =1;
var sum = 0;
while(i <= 10){
    sum = sum + i;
    i = i + 1;
}

console.log(sum);

//2+4+6+8+........+100=

var i = 2;
var sum =0;
while(i<=100){
    sum = sum + i;
    i = i + 2;
}
console.log("Sum of even numbers from 1 to 100 is : "+sum);



//A program to demonstrate while loop
// while loop syntax
var i = 1;
while (i <= 10) {
  document.write("Bangladesh" + "<br>");
  i++;
}

document.write("End of for loop");

// sum of numbers 1+2+..+100
var sum = 0;
var x = 1;
while (x <= 100) {
  sum = sum + x;
  x++;
}
document.write(sum);