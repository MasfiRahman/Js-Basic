// Array methods program

// you have already learned about pop(),push(),concat()
// shift(), unshift(), splice(pos,noe,ele1,ele2..), splice(start INDEX,end INDEX), slice(4)
// sort(), reverse()

var names = ["Masfi", "Robayet", "Tamim", "Fahim"];
console.log(names);

//  shift opposite of pop
// names.shift();
// console.log(names);

//  unshiftt opposite of push
// names.unshift("Saad");
// console.log(names);

// adding elements using splice
// names.splice(2,1,"Karim","Rahim");// at index 2, remove 1 last element and add Karim and Rahim
// console.log(names);

// removing elements using splice
// names.splice(1,2);// at index 1  and remove last 2 elements
// console.log(names);

// slice
// var newArray = names.slice(1);
// console.log(newArray)
// console.log(names)

// var sortedNames = names.sort();
// names.reverse();
// console.log(sortedNames)

var numbers = [20, 5, 25, 45, 1];
numbers.sort(function (a, b) {
  return b - a; // descending
  /*return a-b;*/ // ascending
  });
console.log(numbers);



// Array in js
let demoArray = ["Masfi Rahman", 3.92, null, true, undefined, { name: "masfi" }];
console.log(demoArray);

//length of an array
console.log(demoArray.length);

// accessing array element
console.log(demoArray[2]);

// check an item exist or not
console.log(demoArray.indexOf(2.94));

// adding single or multiple items to the starting of an array
demoArray.unshift("England");
// demoArray.unshift("England", "Pakistan");
console.log(demoArray);

// adding items to the ending of an array
demoArray.push("Finland");
// demoArray.push("Finland", "Canada");
console.log(demoArray);

// removing single or multiple items to the starting of an array
demoArray.shift("England");
// demoArray.shift("England", "Pakistan");
console.log(demoArray);

// removing items to the ending of an array
demoArray.pop("Finland");
// demoArray.pop("Finland", "Canada");
console.log(demoArray);

// remove items using splice
demoArray.splice(1, 2);
console.log(demoArray);

// Add items using splice - startIndex, NumberOfItemsToDelete, item / items)
demoArray.splice(0, 1, 2);
console.log(demoArray);

// copy an array using spread operator
let array1 = [4, 5, 6];
let array2 = [1, 2, 3, ...array1];
console.log(array2);

let matrix = [
  [1, 2],
  [3, 4],
];

console.log(matrix[0][1]);