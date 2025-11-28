// Arrow function vs Traditional function

// demo1 - must use parenthesis for no parameters, but for one parameter its optional
function display1(){
    console.log("I am display 1");
}
const display2 = () =>{
    console.log("I am display 2");
}
display1();
display2();




// demo2 - no need to use curly braces if returning or dealing with single statement
function display3(){ console.log("I am display 3");}
const display4 = () => console.log("I am display 4");
display3();
display4();




// returning value in arrow function - no need to use curly braces if returning or dealing with single statement
function display5(){ 
    return "I am display 5";
}
const display6 = () => "I am display 6";
console.log(display5())
console.log(display6())




// parameters in arrow function 
function add1(x,y){ 
    return x+y;
}
const add2 = (x,y) => x+y;
console.log(add1(10,20))
console.log(add2(20,30))
