// Example of JavaScript code triggering an Out-of-Bounds (OOB) vulnerability

// CVE-202A-AAAA: Out-of-Bounds (OOB) vulnerability in Array.prototype.concat
// Description: An OOB vulnerability exists in the `concat` method of the Array prototype, allowing attackers to access elements outside the bounds of the array.

// Creating arrays with vulnerable lengths
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];

// Triggering the vulnerability by concatenating arrays with out-of-bounds indices
var index = 10; // Out-of-Bounds index
var concatenatedArray = arr1.concat(arr2, index); // Attempt to concatenate arrays with out-of-bounds index

// Example of potential consequences
// This could lead to unintended memory corruption or exposure of sensitive data if successfully exploited by an attacker.
