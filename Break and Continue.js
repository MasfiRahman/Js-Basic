for(var i=1;i<=10;i++){
    if(i==10){
        break;//Using break statement for terminiting or exit the loop
    }
    console.log(" "+i);
}
console.log("End");




for(var i=1;i<=30;i++){
    if(i==10){
        continue;//Using continue statement for terminating or skipping the current iteration of the loop and continue with the next iteration
    }
    console.log(" "+i);
}
console.log("End");

//Print all odd numbers between 1 to 100
for(var i=1;i<=100;i++){
    if(i%2==0){
       continue;
    }
    console.log(" "+i);
}
console.log("End");

//Print all even numbers between 1 to 100
for(var i=1;i<=100;i++){
    if(i%2!=0){
        continue
    }
    console.log(" "+i);
}
console.log("End");


// break and continue  program

// The break statement "jumps out" of a loop or switch.
for (var i = 1; i <= 100; i++) {
  if (i == 20) break;
  document.write(i + "<br/>");
}

// The continue statement breaks one iteration (in the loop), if a specified condition occurs, and continues with the next iteration in the loop.
for (var i = 1; i <= 100; i++) {
  if (i == 20) continue;
  document.write(i + "<br/>");
}
