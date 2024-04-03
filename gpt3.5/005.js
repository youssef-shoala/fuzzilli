// Example code demonstrating a server-side request forgery (SSRF) vulnerability
function ssrfVulnerability() {
  // Simulated user input
  let url = "http://internal-website.com/data";

  // Fetch data from the provided URL (simulated)
  fetch(url)
    .then(response => response.text())
    .then(data => console.log("Data from internal website:", data))
    .catch(error => console.error("Error fetching data:", error));
}

// Execute the vulnerable function
ssrfVulnerability();
