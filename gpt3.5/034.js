// Example code demonstrating a vulnerability inspired by CVE-2021-30550 in JavaScriptCore (JSC) engine
function jscVulnerability() {
  // Create a large array of objects
  let largeArray = [];
  for (let i = 0; i < 2 ** 16; i++) {
    largeArray.push({ index: i });
  }

  // Define a function that accesses an out-of-bounds index of the array
  function accessOutOfBoundsIndex(arr) {
    // Intentionally vulnerable code: accessing an out-of-bounds index
    let element = arr[arr.length * 2];
    console.log("Vulnerable element:", element);
  }

  // Call the function with the large array
  accessOutOfBoundsIndex(largeArray);
}

// Execute the vulnerable function
jscVulnerability();
