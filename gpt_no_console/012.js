// Example code demonstrating a vulnerability inspired by CVE-2019-11043
function phpVulnerability() {
  // Simulated user input containing a malicious string
  let userInput = "../../../../../../../../../etc/passwd\x00";

  // Constructing a file path using user input
  let filePath = "/var/www/html/uploads/" + userInput + ".jpg";

  // Attempting to read the file at the constructed path
//  console.log("Attempting to read file:", filePath);
  // Code to read the file would go here...
}

// Execute the vulnerable function
phpVulnerability();
