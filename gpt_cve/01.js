// Creating an array with some initial values
var arr = [1, 2, 3, 4, 5];

// Accessing an element outside the bounds of the array
var index = arr.length + 1;

// Triggering out-of-bounds access
var value = arr[index];

// Logging the value to see if it crashes or behaves unexpectedly
//console.log("Value at index", index, "is", value);
