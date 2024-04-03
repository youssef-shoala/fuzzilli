// Example code demonstrating a vulnerability inspired by CVE-2021-30547
function v8EngineVulnerability() {
  // Create a function with a large number of parameters
  function vulnerableFunction(...args) {
    console.log("This function is vulnerable to CVE-2021-30547.");
  }

  // Call the vulnerable function with a large number of arguments
  let args = [];
  for (let i = 0; i < 2 ** 16; i++) {
    args.push(i);
  }
  vulnerableFunction(...args);
}

// Execute the vulnerable function
v8EngineVulnerability();
