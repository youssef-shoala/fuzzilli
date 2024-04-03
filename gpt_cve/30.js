// Example JavaScript code demonstrating a type confusion vulnerability
function triggerTypeConfusion(obj) {
  // Assume obj is an object with properties 'a' and 'b'
  // and that 'a' and 'b' are intended to be numbers
  obj.a = 10;
  obj.b = 20;
  
  // Now, let's confuse the type of 'a'
  obj.a = "I'm not a number anymore!";
  
  // At this point, obj.b might be treated as a string instead of a number
  // if the engine does not properly enforce types
  
  // Perform some operation expecting 'b' to be a number
  return obj.b + 5; // This might concatenate strings instead of adding numbers if there's type confusion
}

// Create an object with 'a' and 'b' properties
var myObj = { a: 0, b: 0 };

// Trigger the type confusion vulnerability
//console.log(triggerTypeConfusion(myObj));
