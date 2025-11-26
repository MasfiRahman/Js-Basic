// Array is an object :- collection of variables

//var names = new Array();
/*names[0]="masfi";
names[1]="tamim";
names[2]="rupayan";
names[3]="hemal";
names[4]="robayet";
*/
var names=["masfi","tamim","rupayan","hemal","robayet"];

console.log(names);//before pushing
console.log(names.length);//before pushing
console.log(names[4]);//'before pushing


names.push("fahim");//Add value at the end
console.log(names);//After pushing
console.log(names.length);//After pushing

names.pop();//Rremove value at the end
console.log(names);//after poping
console.log(names.length);//After popping


var country1 =["bd","pak","irn"];
var country2 =["usa","ind","isr"];

var countries = country1.concat(country2);//Adding or Marging two array using concating function
console.log(countries);



// Array -> is a collection of variables
// Array VS Object -> arrays use numbered indexes. but, objects use named indexes.

// creating an array with 20 variables
var names = new Array(20);

//array index always start with 0
names[0] = "Rrrrr";
names[1] = "Sssss";

//printing an array elements
console.log(names[1]);

// creating an array with values
var students = ["Rrrrr", "Sssss", "Ppppp", "Nnnnn"];
console.log("students = " + students);
console.log("studnet at 2 index : " + students[2]);

//finding the length of an array
console.log("Length of student array : " + students.length);

//pusing an element in array
students.push("Mmmmm");
console.log("after pushing students = " + students);

//pusing an element in array
students.pop("Mmmmm");
console.log("after poping students = " + students);

// concatenation of arrays
var num1 = [10, 20];
var num2 = [30, 40, 50, 60];
var num = num1.concat(num2);
console.log("After concatenation : " + num);
