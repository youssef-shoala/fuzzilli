// Example code demonstrating a vulnerability inspired by CVE-2021-30561
function v8EngineVulnerability() {
  // Create a large string
  let largeString = "A".repeat(2 ** 20); // 1 MB string

  // Use the large string in a regular expression
  let regex = new RegExp(`(${largeString}){2}|(.*)`);

  // Execute the vulnerable regular expression
  let match = regex.exec("AA");
  console.log("Match:", match);
}

// Execute the vulnerable function
v8EngineVulnerability();
