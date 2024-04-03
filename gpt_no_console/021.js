// Example code demonstrating a crash-inducing JavaScript code
function crashJavaScript() {
  let obj = {}; // Creating an empty object
  while (true) {
    obj = { ...obj, next: {} }; // Creating objects with an ever-increasing depth
  }
}

// Execute the crash-inducing function
crashJavaScript();
