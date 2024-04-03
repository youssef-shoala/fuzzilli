// Vulnerable code snippet
function processArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Attacker-controlled array
const attackerArray = [1, 2, 3, 4, 5];

// Modifying array prototype
Array.prototype.toString = function() {
  // Malicious payload: Accessing unintended memory locations
//  console.log("Accessing unintended memory locations:", this);
  // Additional malicious actions can be performed here
};

// Triggering the vulnerability
//console.log(processArray(attackerArray));
