// Example of JavaScript code triggering an Out-of-Bounds (OOB) vulnerability

// CVE-202C-CCCC: Out-of-Bounds (OOB) vulnerability in Array.prototype.slice
// Description: An OOB vulnerability exists in the `slice` method of the Array prototype, allowing attackers to access elements outside the bounds of the array.

// Creating an array with a vulnerable length
var arr = [1, 2, 3, 4, 5];

// Triggering the vulnerability by slicing with out-of-bounds indices
var startIndex = 3; // Start index
var endIndex = 10; // End index exceeding the bounds of the array
var slicedArray = arr.slice(startIndex, endIndex); // Attempt to slice the array with out-of-bounds indices

// Example of potential consequences
// This could lead to unintended memory corruption or exposure of sensitive data if successfully exploited by an attacker.
