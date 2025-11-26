//Fizzbuzz challange

for( let i=1 ;i<=100;i++){
    if (i%5==0 && i%3==0)/*or if (i%15==0)*/{
        console.log(`FizzBuzz\n`);
    }
    else if(i%3==0){
        console.log(`Fuzz\n`);
    }
    else if (i%5==0){
        console.log(`Buzz\n`);
    } 
    else{
        console.log(`${i}\n`);
    }
}

