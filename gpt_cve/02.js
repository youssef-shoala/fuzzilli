// Define an array with some initial values
var arr = [10, 20, 30, 40, 50];

// Define a function that accesses elements of the array
function accessArray(index) {
    // Access the array at the specified index
    return arr[index];
}

// Trigger out-of-bounds access by passing an invalid index
var result = accessArray(10);

// Log the result to observe behavior
//console.log("Result of out-of-bounds access:", result);
