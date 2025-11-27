// Web storage API - allows us to store & read data in browser
// Web storage API - localStorage, sessionStorage(When session storage using then data losing after closing the browser)

// localStorage - store, read, update and remove data and local storage using data is parmanent
// no expiry date: data never gets lost even if you close the browser

// localStorage store data as key value pair - string

// setItem(key, value) is all must be as an String and also as an parameter String
//console.log(localStorage);
// Set Item in Local Storage
// localStorage.setItem("userName", "masfi rahman");
// localStorage.setItem("password", "01327379287");

// getItem(key) only declare as an key value to get the value
// const userName = localStorage.getItem("userName");
// const userPassword = localStorage.getItem("password");
// console.log(userName, userPassword);

//Update  value in existing key
//localStorage.setItem("userName", "Hafiz tamim");
//localStorage.setItem("password", "01489679987");

// removeItem(key)//Only Key mention
// localStorage.removeItem("userName");
// localStorage.removeItem("password");

// setItem(key, value)
// const countries = ["Pakistan", "Bangladesh", "Malaysia"];
// localStorage.setItem("countries", JSON.stringify(countries));//Using data to an convert to Stringfy

//  getItem(key)//Get item in convert to original data to use as an JSON parse
// const countriesList = JSON.parse(localStorage.getItem("countries"));
// console.log(countriesList);

// localStorage.clear();//Clearing all in Local Storage