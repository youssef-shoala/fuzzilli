// Generate JavaScript code based on discovered side effect vulnerability (CVE)

// Define an empty object
let obj = {};

// Define a property on the object with a large index
Object.defineProperty(obj, "1000", {
    get: function() {
        // Accessing this property triggers a side effect vulnerability
        obj[2000] = "Side effect payload";
        return 123;
    }
});

// Access the property with a large index
let value = obj[1000];

// Log the value obtained
//console.log(value);
