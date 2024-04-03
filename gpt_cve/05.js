// Define an array with some initial values
var arr = [10, 20, 30, 40, 50];

// Define a function to perform an operation on array elements
function operateOnArray(index) {
    // Perform some operation on the array element at the specified index
    arr[index] *= 2;
}

// Trigger out-of-bounds access by passing an index beyond the array length
operateOnArray(6);

// Log the updated array to observe potential changes
//console.log("Updated array:", arr);
