// Simulated heap overflow vulnerability
function heapOverflow() {
    var arr = new Array(1000); // Allocate an array with fixed size
    for (var i = 0; i <= 1000; i++) { // Looping beyond the array boundary
        arr[i] = i; // Writing beyond the allocated memory
    }
}

// Call the function to trigger the potential heap overflow
heapOverflow();
