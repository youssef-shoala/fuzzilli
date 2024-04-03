// Example of JavaScript code triggering an Out-of-Bounds (OOB) vulnerability

// CVE-202G-GGGG: Out-of-Bounds (OOB) vulnerability in Array.prototype.reduce
// Description: An OOB vulnerability exists in the `reduce` method of the Array prototype, allowing attackers to access elements outside the bounds of the array.

// Creating an array with a vulnerable length
var arr = [1, 2, 3, 4, 5];

// Triggering the vulnerability by reducing the array with an out-of-bounds index
var outOfBoundsIndex = 10; // Out-of-bounds index
var result = arr.reduce(function(accumulator, currentValue, currentIndex) {
    return accumulator + arr[currentIndex + outOfBoundsIndex];
}, 0);

// Example of potential consequences
// This could lead to unintended memory corruption or exposure of sensitive data if successfully exploited by an attacker.
