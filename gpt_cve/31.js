function processInput(input) {
  if (typeof input === 'function') {
    // If input is a function, execute it
    input();
  } else {
    // If input is not a function, treat it as a string
//    console.log("Input:", input);
  }
}

// Define an object with a custom property 'valueOf'
var obj = {
  valueOf: function() {
    // This function returns a function instead of a primitive value
    return function() {
//      console.log("This is a function");
    };
  }
};

// Call the function with 'obj'
// This will trigger a type confusion as the function expects a string or a non-function type but receives an object that returns a function
processInput(obj);
