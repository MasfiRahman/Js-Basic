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