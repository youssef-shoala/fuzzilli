// Example of JavaScript code triggering an Out-of-Bounds (OOB) vulnerability

// CVE-202Z-ZZZZ: Out-of-Bounds (OOB) vulnerability in String.prototype.substr
// Description: An OOB vulnerability exists in the `substr` method of the String prototype, allowing attackers to read memory outside the bounds of the string.

// Creating a vulnerable string
var vulnerableString = "VulnerableString";

// Triggering the vulnerability by accessing characters outside the bounds of the string
var startIndex = 5; // Start index
var length = 20; // Length exceeding the bounds of the string
var substring = vulnerableString.substr(startIndex, length); // Attempt to extract a substring with out-of-bounds length

// Example of potential consequences
// This could lead to unintended exposure of sensitive information or data leakage if successfully exploited by an attacker.
