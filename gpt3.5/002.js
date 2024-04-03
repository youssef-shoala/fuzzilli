// Example code demonstrating a prototype pollution vulnerability
function prototypePollution() {
  // Define a base object
  let base = {};

  // Define a payload with malicious properties
  let payload = {
    "__proto__": {
      isAdmin: true
    }
  };

  // Merge the payload into the base object
  let merged = Object.assign({}, base, payload);

  // Check if the property has been polluted
  console.log("isAdmin" in base); // Expected: false
  console.log("isAdmin" in merged); // Expected: true
}

// Execute the vulnerable function
prototypePollution();
