// Example code demonstrating a vulnerability inspired by CVE-2021-22876
function v8EngineVulnerability() {
  let array = new Uint8Array(1024 * 1024); // Creating a large Uint8Array
  let buffer = new ArrayBuffer(1024 * 1024); // Creating a large ArrayBuffer

  // Triggering the vulnerability by accessing an out-of-bounds index
  let value = array[buffer.byteLength]; // Accessing index beyond the array bounds
//  console.log("Value:", value); // This line may not be reached
}

// Execute the vulnerable function
v8EngineVulnerability();
