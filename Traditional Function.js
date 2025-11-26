//Creating Function 
function square(){//When variiable is declared then we can not  use parameter
     var num = 5;
     var result = num*num;
     console.log("Result = "+result+"</br>");
}
//Calling Function
square();



function square(num){//When variiable is not declared then we can use parameter
     var result = num*num;
     console.log("Result = "+result+"</br>");
}
square(6);


//when two parameter included
function square(num1,num2){//When variiable is not declared then we can use parameter
     var result = num1*num2;
     console.log("Result = "+result+"</br>");
}
square(9,10);

//when function return a value
function square(num1,num2){//When variiable is not declared then we can use parameter
     var result = num1*num2;
     return result;
}
//console.log("Result = "+square(12,14)+"</br>");//Direct printing
var x =  square(12,14);//Storing Value
console.log(x);//then storing variable printing


//add function
function addition(x,y){
    var result = x+y;
    console.log("Addition = "+result);
}
addition(2,4);
addition(500,60);

//sub function
function subtraction(x,y){
    var result = x-y;
    console.log("Subtraction = "+result);
}
subtraction(99,100);
subtraction(80,40);


//Multiply function
function multiply(x,y){
    var result = x*y;
    console.log("Multiplication = "+result);
}
multiply(5,4);
multiply(20,6);


//Divide function
function divide(x,y){
    var result = x/y;
    console.log("Division = "+result);
}
divide(20,4);
divide(90,3);

// Function example

// creating function without parameter
function message() {
    document.write("Hello, I am a function without parameter" + "<br/>");
}

// creating function with one parameter
function welcomeMessage(name) {
    document.write("welcome " + name + "<br/>");
}

// creating function with multiple parameters
function addition(num1, num2) {
    var sum = num1 + num2;
    document.write("addition is  " + sum + "<br/>");
}

// returning from a function
function square(num) {
    return num * num;
}


//calling functions
message();
welcomeMessage("Masfi Rahman");
addition(2, 3);
document.write("square of 5 is  " + square(5) + "<br/>");