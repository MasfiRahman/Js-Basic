// object program example
// what is Object?
// How to create an object?
// How to access object properties?
// Constructor, this keyword
// function inside constructor

// declaring variables and using them
var name = "Masfi Rahman";
var age = 23;
var cgpa = 2.94;
var lang = ["Bengali", "English"];

// declaring objects -> object is one type of variable that can store differnt types of variables
var student1 = {
    // property : value
    name: "Masfi Rahman",
    age: 23,
    cgpa: 2.94,
    lang: ["Bengali", "English"],
}

var student2 = {
    // property : value
    name: "Rokib",
    age: 28,
    cgpa: 2.92,
    lang: ["Hindi", "Bengali"],
}

var student3 = {
    // property : value
    name: "Sweety",
    age: 25,
    cgpa: 4.92,
    lang: ["Bengali", "Urdu"],
}
// printing object property's value
// object properties can be accessed in two ways: objectName.propertyName or objectName["propertyName"]
console.log(student1.name);
console.log(student1.age);
console.log(student1.cgpa);
console.log(student1.lang);



console.log("using constructor");
// adding constructor and simplifying the task

function Student(name, age, cgpa, lang) {
    this.name = name;
    this.age = age;
    this.cgpa = cgpa;
    this.lang = lang;

    // adding function inside the constructor
    // this.display = function () {
    //     console.log(this.name);
    // }

}

var s1 = new Student("Masfi", 27, 3.92, ["Bengali", "English"]);
var s2 = new Student("Ritu", 23, 4.92, ["Bengali", "Urdu"]);
var s3 = new Student("Tamim", 29, 4.68, ["Bengali", "Hindi"]);

console.log(s1);
console.log(s2);
console.log(s3);



// object in js
// Object -> key, value pair
const tutorials = {
  html: 32,
  css: 48,
  js: 60,
  jquery: 8,
  bootstrap: 25,
  react: 15,
  java: 155,
};

// printing the object
console.log(tutorials);

// accessing object property
console.log(tutorials.html);

// changing the property value
tutorials.html = 33;
console.log(tutorials.html);

// add new property
tutorials.node = 5;
console.log(tutorials.node);

// check object has a property
console.log("tutorial has property html: " + tutorials.hasOwnProperty("html"));

// how to access nested object
let studentInfo = {
  id: 101,
  personalInfo: {
    phone: {
      mobile: "01710444700",
      home: "01710",
    },
  },
};
console.log(studentInfo.personalInfo.phone.home);

// bracket notation for accessing property
// you can use it when property is unknown
const subjectName = "c plus plus";
tutorials[subjectName] = 65;
console.log(tutorials);

const addProperty = (property, value) => {
  tutorials[property] = value;
};

addProperty("python", 65);
console.log(tutorials);

// iterate through an object with for ... in
for (const key in studentInfo) {
  console.log(`${key} = ${studentInfo[key]}`);
}

const students = {
  karim: {
    age: 25,
  },
  rahim: {
    age: 35,
  },
  sagor: {
    age: 30,
  },
  nehal: {
    age: 29,
  },
};

// find out all the students whose age is less than 30 using for in loop
const checkAge = (std) => {
  for (const x in std) {
    if (std[x].age <= 30) {
      console.log(x);
    }
  }
};
checkAge(students);

// how to get all the keys of an object inside in an array
console.log(Object.keys(students));