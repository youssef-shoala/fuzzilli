// Example code demonstrating a vulnerability inspired by CVE-2021-30557
function v8EngineVulnerability() {
  // Define a function with a large number of parameters
  function vulnerableFunction(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    console.log("This function is vulnerable to CVE-2021-30557.");
  }

  // Create an array with a large number of elements
  let largeArray = Array.from({ length: 2 ** 16 }, (_, i) => i);

  // Call the vulnerable function with the large array as arguments
  vulnerableFunction(...largeArray);
}

// Execute the vulnerable function
v8EngineVulnerability();
