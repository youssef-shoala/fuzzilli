// Example of JavaScript code triggering an Out-of-Bounds (OOB) vulnerability

// CVE-202F-FFFF: Out-of-Bounds (OOB) vulnerability in Array.prototype.reverse
// Description: An OOB vulnerability exists in the `reverse` method of the Array prototype, allowing attackers to access elements outside the bounds of the array.

// Creating an array with a vulnerable length
var arr = [1, 2, 3, 4, 5];

// Triggering the vulnerability by reversing the array
arr.reverse(); // Attempt to reverse the array

// Example of potential consequences
// This could lead to unintended memory corruption or exposure of sensitive data if successfully exploited by an attacker.
