// for..of loop can iterate over iterable objects such as string, array, map, set etc.
const students1 = ["s1", "s2", "s3", "s4"];
for(let name of students1){
    console.log(name)
}

// For loop through object we can use for/in loop
const students2 = {
name: "Masfi",
age: 23, 
cgpa : 3.08
}
for(let x in students2){ 
   console.log(x); //printing all the keys
    console.log(students2[x]); //printing all the values
}

let students = {
    ID : 23101182,
    name : 'Masu',
    cgpa : 2.94
}

for(let x in students){
    console.log(`${x} : ${students[x]}`)
}