// Example of JavaScript code triggering an Out-of-Bounds (OOB) vulnerability

// CVE-202K-KKKK: Out-of-Bounds (OOB) vulnerability in Array.prototype.filter
// Description: An OOB vulnerability exists in the `filter` method of the Array prototype, allowing attackers to access elements outside the bounds of the array.

// Creating an array with a vulnerable length
var arr = [1, 2, 3, 4, 5];

// Triggering the vulnerability by filtering the array with an out-of-bounds index
var outOfBoundsIndex = 10; // Out-of-bounds index
var filteredArray = arr.filter(function(element, index) {
    return index >= outOfBoundsIndex;
});

// Example of potential consequences
// This could lead to unintended memory corruption or exposure of sensitive data if successfully exploited by an attacker.
