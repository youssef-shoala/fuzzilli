// Define an array with some initial values
var arr = [1, 2, 3, 4, 5];

// Define a function to access elements of the array
function accessArray(index) {
    // Access the array at the specified index
    return arr[index];
}

// Trigger out-of-bounds access by passing a non-numeric index
var result = accessArray("invalid");

// Log the result to observe behavior
//console.log("Result of out-of-bounds access:", result);
