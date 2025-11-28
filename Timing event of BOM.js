// JS BOM
// JS Timing events  methods
// setTimeOut(), setInterval()

/**
 * Paste the following code in your index.html file
<button class="save-btn">Save</button>
    <p class="message"></p>
 */

// setTimeout(() => {
//   console.log("hi");
// }, 3000);

// setTimeout(display, 2000);

// function display() {
//   console.log("display function");
// }

const saveButton = document.querySelector(".save-btn");
const message = document.querySelector(".message");

// saveButton.addEventListener("click", saveUser);

// function saveUser() {
//   message.textContent = "user registration successful";

//   setTimeout(() => {
//     message.textContent = "";
//   }, 2000);
// }

// saveButton.addEventListener("click", displayCount);
// function displayCount() {
//   let count = 1;
//   message.textContent = count;

//   setInterval(() => {
//     count++;
//     message.textContent = count;
//   }, 1000);
// }
