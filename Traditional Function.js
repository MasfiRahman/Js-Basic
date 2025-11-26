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