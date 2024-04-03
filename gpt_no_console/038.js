// Define the JavaScript code to be injected
const injectedCode = `
  // JavaScript code injected for fuzz testing
  function vulnerableFunction(input) {
    // Example vulnerable code - simulate a buffer overflow vulnerability
    let buffer = new Array(100);
    for (let i = 0; i <= input.length; i++) {
      buffer[i] = input.charCodeAt(i);
    }
//    console.log("Buffer overflow simulated:", buffer);
  }

  // Call the vulnerable function with a test input
  vulnerableFunction("Fuzzing input");
`;

// Create a new script element
const scriptElement = document.createElement('script');

// Set the type attribute to JavaScript
scriptElement.setAttribute('type', 'text/javascript');

// Set the text content of the script element to the injected code
scriptElement.textContent = injectedCode;

// Append the script element to the document's body to inject the code
document.body.appendChild(scriptElement);
