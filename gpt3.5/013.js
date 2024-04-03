// Example code demonstrating a vulnerability inspired by CVE-2017-5638
function strutsVulnerability() {
  // Simulated user input containing a malicious string
  let maliciousPayload = "Content-Disposition: form-data; name=\"upload\"; filename=\"${{101-97}}.jsp\"\\nContent-Type: text/plain\\n\\n${{100*2}}";

  // Constructing a request body with the malicious payload
  let requestBody = `---------------------------1234567890\r\nContent-Disposition: form-data; name="file"; ${maliciousPayload}\r\n---------------------------1234567890--`;

  // Sending a malicious HTTP request with the crafted payload
  console.log("Sending malicious request with payload:\n", requestBody);
  // Code to send HTTP request would go here...
}

// Execute the vulnerable function
strutsVulnerability();
