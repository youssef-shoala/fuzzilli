//// This code snippet demonstrates a type confusion vulnerability without console.log commands
// The vulnerable function expects 'data' to be an array of objects, each containing a 'performAction' method
// However, the function does not properly handle cases where 'data' contains objects without the expected method

function vulnerable(data) {
    // Type confusion vulnerability here
    for (var i = 0; i < data.length; i++) {
        if (typeof data[i].performAction === 'function') {
            // If 'performAction' method exists, invoke it
            data[i].performAction();
        } else {
            // If 'performAction' method is missing, handle the error
            throw new Error("Object at index " + i + " does not have a 'performAction' method");
        }
    }
}

// Proof of concept: Triggering the vulnerability
function Action() {}

Action.prototype.performAction = function() {
//    console.log("Performing action");
};

var data = [
    new Action(),
    { notAction: true }, // Object missing the 'performAction' method
    new Action()
];

vulnerable(data); // This call will lead to type confusion as the object at index 1 does not have the expected method
