// Web storage API - allows us to store & read data in browser
// Web storage API - sessionStorage(When session storage using then data losing after closing the browser)

// localStorage - store, read, update and remove data and local storage using data is parmanent
//session Storage - 
// no expiry date(localStorage): data never gets lost even if you close the browser but sessionStorage to expiry date is always available but when browser close then gone

// localStorage vs sessionStorage
// 10mb vs 5mb
// parmanent vs session (tab)

// sessionStorage.setItem("user1", "masfi");
// sessionStorage.setItem("user2", "arpon");
// const userName = sessionStorage.getItem("user");
// console.log(userName);

// sessionStorage.removeItem("user");

// sessionStorage.clear();

const user = { id: "23101182", name: "masfi" };
sessionStorage.setItem("user", JSON.stringify(user));

const userInfo = JSON.parse(sessionStorage.getItem("user"));//Get back to retrieve to using parse formula
console.log(userInfo);
