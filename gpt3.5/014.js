// Example code demonstrating a vulnerability inspired by CVE-2019-5825
function v8EngineVulnerability() {
  // Simulated user input containing a malicious string
  let maliciousInput = "1; while(true) {}";

  // Constructing a regular expression using user input
  let regex = new RegExp(maliciousInput);

  // Executing the regular expression (simulated)
  console.log("Executing regular expression:", regex);
  // Code to execute the regular expression would go here...
}

// Execute the vulnerable function
v8EngineVulnerability();
