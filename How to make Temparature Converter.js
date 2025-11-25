var farn = parseFloat(prompt("Enter Fahrenheit = "));
//Converting Farenheit to Celsius
var cels = (farn-32)* (5/9);

document.write("Celsius : "+cels);

 var cels = parseFloat(prompt("Enter Celsius = "));
//Converting to Celsius to Farenheit
var farn = (cels * (9 / 5)) + 32;
 document.write("Fahrenheit = " + farn);