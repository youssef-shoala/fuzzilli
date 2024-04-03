// This code snippet demonstrates a type confusion vulnerability with nested objects and arrays
// The vulnerable function expects 'data' to be an object containing arrays of numbers
// However, the function does not properly handle cases where 'data' contains nested objects or non-array values

function vulnerable(data) {
    // Type confusion vulnerability here
    for (var key in data) {
        if (Array.isArray(data[key])) {
            var sum = 0;
            for (var i = 0; i < data[key].length; i++) {
                sum += data[key][i]; // Assuming each element of 'data[key]' is a number
            }
//            console.log("Sum of " + key + ": " + sum);
        } else {
//            console.log("Invalid data format for key: " + key);
        }
    }
}

// Proof of concept: Triggering the vulnerability
var nestedData = {
    numbers: [1, 2, 3],
    nested: { foo: "bar" }, // Nested object within 'nestedData'
    invalid: "string" // Non-array value within 'nestedData'
};

vulnerable(nestedData); // This call will lead to type confusion as 'nested' and 'invalid' keys do not contain arrays of numbers
