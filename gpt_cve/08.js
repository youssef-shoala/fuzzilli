// Example of JavaScript code triggering an Out-of-Bounds (OOB) vulnerability

// CVE-202X-XXXX: Out-of-Bounds (OOB) vulnerability in Array.prototype.splice
// Description: An OOB vulnerability exists in the `splice` method of the Array prototype, allowing attackers to manipulate memory and potentially execute arbitrary code.

// Constructing an array with a vulnerable length
var arr = new Array(10); // Create an array with length 10

// Triggering the vulnerability by accessing an element outside the bounds of the array
var index = 20; // Out-of-Bounds index
arr.splice(index, 1); // Attempt to splice at an out-of-bounds index

// Example of potential consequences
// This could lead to unintended memory manipulation or code execution if successfully exploited by an attacker.
