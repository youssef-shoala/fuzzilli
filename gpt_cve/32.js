// This code snippet demonstrates a more complex type confusion vulnerability
// The vulnerable function expects 'obj' to be an array of objects, each containing a 'name' property
// However, the function does not properly handle cases where 'obj' contains nested arrays

function vulnerable(obj) {
    // Type confusion vulnerability here
    for (var i = 0; i < obj.length; i++) {
        var name = obj[i].name; // Assuming each element of 'obj' is an object with 'name' property
//        console.log("Name: " + name);
    }
}

// Proof of concept: Triggering the vulnerability
var nestedArray = [{ name: "John" }, { name: "Doe" }, [1, 2, 3]]; // 'nestedArray' contains a nested array
vulnerable(nestedArray); // This call will lead to type confusion as one element is not an object
