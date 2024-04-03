// Example code demonstrating a crash-inducing JavaScript code
function crashJavaScript() {
  let arr = [];
  while (true) {
    arr.push(new Array(1000000)); // Creating large arrays in an infinite loop
  }
}

// Execute the crash-inducing function
crashJavaScript();
