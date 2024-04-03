// Example of JavaScript code triggering an Out-of-Bounds (OOB) vulnerability

// CVE-202D-DDDD: Out-of-Bounds (OOB) vulnerability in String.prototype.substring
// Description: An OOB vulnerability exists in the `substring` method of the String prototype, allowing attackers to read memory outside the bounds of the string.

// Creating a vulnerable string
var vulnerableString = "VulnerableString";

// Triggering the vulnerability by accessing characters outside the bounds of the string
var startIndex = 5; // Start index
var endIndex = 20; // End index exceeding the length of the string
var substring = vulnerableString.substring(startIndex, endIndex); // Attempt to extract a substring with out-of-bounds end index

// Example of potential consequences
// This could lead to unintended exposure of sensitive information or data leakage if successfully exploited by an attacker.
