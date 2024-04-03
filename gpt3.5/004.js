// Example code demonstrating a SQL injection vulnerability
function sqlInjectionVulnerability() {
  // Simulated user input
  let userInput = "'; DROP TABLE users; --";

  // Constructing a SQL query with user input
  let query = "SELECT * FROM users WHERE username = '" + userInput + "'";

  // Execute the SQL query (simulated)
  console.log("Executing SQL query: " + query);
  // Code to execute the query would go here...
}

// Execute the vulnerable function
sqlInjectionVulnerability();
