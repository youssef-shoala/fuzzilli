// Define an array with some initial values
var arr = [100, 200, 300, 400, 500];

// Define a function to manipulate the array
function manipulateArray(index, value) {
    // Update the value at the specified index
    arr[index] = value;
}

// Attempt to manipulate the array with an out-of-bounds index
manipulateArray(7, 700);

// Log the updated array to observe potential changes
//console.log("Updated array:", arr);
