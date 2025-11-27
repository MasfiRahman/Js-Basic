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
