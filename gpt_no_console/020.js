// Example code demonstrating a crash-inducing JavaScript code
function crashJavaScript() {
  let array = new Array(-1); // Creating an array with negative length
//  console.log("Array created successfully."); // This line may not be reached
}

// Execute the crash-inducing function
crashJavaScript();
