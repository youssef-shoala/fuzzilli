// This code snippet demonstrates a basic type confusion vulnerability
// The vulnerable function takes an argument 'obj' which is expected to be an array
// However, the function assumes 'obj' to be an array without proper type checking

function vulnerable(obj) {
    // Type confusion vulnerability here
    var length = obj.length; // 'obj' is assumed to be an array
    
    // Accessing 'length' property assuming 'obj' is an array
//    console.log("Length of the array is: " + length);
}

// Proof of concept: Triggering the vulnerability
var obj = { length: 10 }; // 'obj' is an object, not an array
vulnerable(obj); // This call will lead to type confusion as 'obj' is not an array
