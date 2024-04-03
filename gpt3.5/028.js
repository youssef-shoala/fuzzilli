// Example code demonstrating a vulnerability inspired by CVE-2021-21224
function v8EngineVulnerability() {
  // Create a large string
  let largeString = "A".repeat(2 ** 20); // 1 MB string

  // Use the large string in a regular expression
  let regex = new RegExp(`(${largeString})|(.*)`);

  // Execute the vulnerable regular expression
  let match = regex.exec(largeString);

  // Log the match
  console.log("Match:", match);
}

// Execute the vulnerable function
v8EngineVulnerability();
