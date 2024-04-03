function printMessage(message) {
//  console.log("Message:", message);
}

// Define an object with a custom toString method
var obj = {
  toString: function() {
    // This function returns a number instead of a string
    return 123;
  }
};

// Call the function with 'obj'
// This will trigger a type confusion as the function expects a string but receives an object
printMessage(obj);
