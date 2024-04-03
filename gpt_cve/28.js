//// This code snippet demonstrates a type confusion vulnerability without console.log commands
// The vulnerable function expects 'data' to be an array of objects, each containing a 'calculate' method
// However, the function does not properly handle cases where 'data' contains objects without the expected method

function vulnerable(data) {
    // Type confusion vulnerability here
    for (var i = 0; i < data.length; i++) {
        if (typeof data[i].calculate === 'function') {
            // If 'calculate' method exists, invoke it
            var result = data[i].calculate();
//            console.log("Result: " + result);
        } else {
            // If 'calculate' method is missing, handle the error
//            console.log("Object at index " + i + " does not have a 'calculate' method");
        }
    }
}

// Proof of concept: Triggering the vulnerability
function Calculator(value) {
    this.value = value;
}

Calculator.prototype.calculate = function() {
    return this.value * 2;
};

var data = [
    new Calculator(1),
    { value: 2 }, // Object missing the 'calculate' method
    new Calculator(3)
];

vulnerable(data); // This call will lead to type confusion as the object at index 1 does not have the expected method
