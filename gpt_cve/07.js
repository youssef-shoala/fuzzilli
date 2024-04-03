// Define an array with some initial values
var arr = [10, 20, 30, 40, 50];

// Define a function to manipulate the array
function manipulateArray(index, value) {
    // Update the value at the specified index
    arr[index] = value;
}

// Attempt to manipulate the array with an out-of-bounds index
manipulateArray(10, 1000);

// Log the updated array to observe potential changes
//console.log("Updated array:", arr);
