// Example code demonstrating a crash-inducing JavaScript code
function crashJavaScript() {
  let arr = [];
  while (true) {
    arr.push(new Uint8Array(1024 * 1024)); // Creating large Uint8Arrays in an infinite loop
  }
}

// Execute the crash-inducing function
crashJavaScript();
