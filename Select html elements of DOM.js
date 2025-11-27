// DOM -> Document Object Model
// Using DOM We can Find / get, change, add, or delete HTML elements.

// How to find HTML Elements 
// document.getElementById()
// document.getElementsByTagName()
// document.getElementsByClassName()
// document.querySelector()
//get element by Id

//document.getElementById("heading1").innerHTML="Hello";//Changing element in direct way
var myheading=document.getElementById("heading1");
myheading.innerHTML="Welcome World";

document.getElementById("para").innerHTML="Bye";

document.getElementById("heading2").innerHTML="Good Bye";

document.getElementsByTagName("h3");//Showing in Web page  console mode then showing some HTML Collection
document.getElementsByTagName("h3")[0].innerHTML="Ooooooow";//Chnaging elemnts at index 0

document.getElementsByClassName("para1");//Showing HTML collection
document.getElementsByClassName("para1")[0].innerHTML="OK thanks";//Changing element at index 0 using class name

// finding element by ID
var h2 = document.getElementById("heading2");
console.log(h2)


// finding element by tagName
var h1 = document.getElementsByTagName("h1")[0];
console.log(h1)


// finding element by tagName
var p = document.getElementsByClassName("para")[0];
console.log(p)


// finding element by querySelector
var q1 = document.querySelector("#heading2");
console.log(q1)

//it will get the first element of the h1 elements
var q2 = document.querySelector("h1");
console.log(q2)

//it will get the first element of the para class
var q3 = document.querySelector(".para");
console.log(q3)

var list = document.querySelector(".my-div li");
console.log(list)

// finding element by querySelectorAll
var q4 = document.querySelectorAll(".para");
console.log(q4)