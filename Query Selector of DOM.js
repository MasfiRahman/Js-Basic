// document.getElementById()
// document.getElementsByTagName()
// document.getElementsByClassName()
// document.querySelector()


document.getElementById("pid").innerHTML="This is changed";
document.querySelector("#pid").innerHTML="this is football";//Using Query Selector by (#)id
document.querySelector(".pclass").innerHTML="Oh! it's really too much hard";//Using Query Selector by (.)class
document.querySelector("p").innerHTML="Thist ";//Using Query Selector by tag name
document.querySelector("li a").innerHTML="this new text";
//document.querySelector("div a").innerHTML="Link is unlinked";//Using div class
document.querySelector(".my-div a").innerHTML="Link is unlinked";//Using div class with (.)dot notation and class name
document.querySelectorAll("p");//Showing NodeList in console mode
document.querySelectorAll("p").innerHTML="This is text";
document.querySelectorAll("p")[0].innerHTML="This rediculus";
document.querySelectorAll("p")[1].innerHTML="This Good";//Changing element at index 1 using querySelectorAll



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