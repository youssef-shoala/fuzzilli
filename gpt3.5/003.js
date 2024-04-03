// Example code demonstrating a cross-site scripting (XSS) vulnerability
function xssVulnerability() {
  // Simulated user input
  let userInput = "<script>alert('XSS Attack!');</script>";

  // Display user input without proper sanitization
  document.write("User input: " + userInput);
}

// Execute the vulnerable function
xssVulnerability();
