// Example code demonstrating a vulnerability inspired by CVE-2021-30562
function v8EngineVulnerability() {
  // Create a function with a large number of parameters
  function vulnerableFunction(...args) {
    console.log("This function is vulnerable to CVE-2021-30562.");
  }

  // Call the vulnerable function with a large number of arguments
  let args = Array.from({ length: 2 ** 16 }, (_, i) => i);
  vulnerableFunction(...args);
}

// Execute the vulnerable function
v8EngineVulnerability();
