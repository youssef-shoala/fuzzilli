function processArray(arr) {
  // Assume arr is an array of numbers
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Define an object with a custom property 'length'
var obj = { 0: 1, 1: 2, 2: 3, length: "not a number" };

// Call the function with 'obj'
// This will trigger a type confusion as the function expects an array but receives an object
//console.log(processArray(obj));
