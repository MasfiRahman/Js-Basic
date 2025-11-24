//var num=20;//declare as a number

//num=toString(num);//Converted number to string
//var num = "20";//Declare as a String 
//var num = "20.6";//Declare as a String

//num = parseFloat(num);//Convert String to float
//num = parseInt(num);//Convert String to Integer at using parseInt 

//console.log(typeof(num));//typeof print show case 

var number = 2.5678;//Declare as a float
console.log(number.toFixed()); //It's output showing as an Integer number 
console.log(number.toFixed(2));// It's output showing after 2 number after the integer number 
console.log(number.toFixed(1));// It's output showing after 1 number after the integer number 
console.log(number.toPrecision(1));//It's working with 1 number of length either float or Integer
console.log(number.toPrecision(2));//It's working with 2 number of length either float or Integer
console.log(number.toPrecision(3));//It's working with 3 number of length either float or Integer
console.log(Number("123"));//Number function using because it's converted String to Number in Direct
console.log(typeof(Number("123")));//It's Showing the typeof Number
console.log(typeof(Number(   "123"   )));//It's output showing the number of Integer ignoring as First Half Space and Right half Space
console.log(typeof(Number(true)));//It's output showing the number of boolean value as a 1
console.log(typeof(Number(false)));//It's output showing the number of boolean value as a 0



//Some example of Number method 

//you can run this program by using the command =>   node program6 .js or adding this file in html

/*var num = "20";
num = num.toString();
console.log(typeof num);

var number = 20;
console.log(typeof number);

number = toString(20);
console.log(typeof number);

var x = 2.56789;
// number of characters after the decimal point
console.log(x.toFixed(1));
console.log(x.toFixed(2));

// total number of characters including the decimal point
console.log(x.toPrecision(1));
console.log(x.toPrecision(2));

console.log(Number(true));
console.log(Number(false));
console.log(Number(" 10"));
console.log(Number(" 10 "));
console.log(Number("10.25"));*/