// Example code demonstrating a vulnerability inspired by CVE-2020-16040
function v8EngineVulnerability() {
  // Simulated user input containing a malicious string
  let maliciousInput = "0.30000000000000004";

  // Convert the malicious input to a floating-point number
  let floatValue = parseFloat(maliciousInput);

  // Check if the value is equal to 0.3
  console.log("Comparing values:", floatValue === 0.3);
}

// Execute the vulnerable function
v8EngineVulnerability();
