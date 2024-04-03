// Example code demonstrating a deserialization vulnerability
function deserializationVulnerability() {
  // Simulated serialized data from an untrusted or external source
  let serializedData = '{"type": "User", "username": "admin", "isAdmin": true}';

  // Deserialize the data using JSON.parse
  let userObject = JSON.parse(serializedData);

  // Process the deserialized user object
  console.log("Deserialized user object:", userObject);

  // Check if the user is an admin
  if (userObject.isAdmin) {
    console.log("Admin access granted!");
    // Perform privileged operations...
  } else {
    console.log("Regular user access granted.");
    // Perform regular operations...
  }
}

// Execute the vulnerable function
deserializationVulnerability();
