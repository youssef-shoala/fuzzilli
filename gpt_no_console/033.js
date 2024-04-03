// Example code demonstrating a hypothetical vulnerability in JavaScriptCore (JSC) engine
function jscVulnerability() {
  // Create a large array of objects
  let largeArray = [];
  for (let i = 0; i < 2 ** 16; i++) {
    largeArray.push({ index: i });
  }

  // Define a function that modifies the array
  function modifyArray(arr) {
    // Intentionally vulnerable code: accessing an out-of-bounds index
    let element = arr[arr.length * 2];
//    console.log("Vulnerable element:", element);
  }

  // Call the function with the large array
  modifyArray(largeArray);
}

// Execute the vulnerable function
jscVulnerability();
