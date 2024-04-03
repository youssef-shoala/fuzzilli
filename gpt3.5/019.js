// Example code demonstrating a crash-inducing JavaScript code
function crashJavaScript() {
  let array = new Array(Infinity); // Creating an array with Infinity length
  console.log("Array created successfully."); // This line may not be reached
}

// Execute the crash-inducing function
crashJavaScript();
