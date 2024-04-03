function add(a, b) {
  return a + b;
}

// Define an object with a property named 'value'
var obj = { value: 10 };

// Call the 'add' function with 'obj' and a string
// This will trigger a type confusion as the function expects numbers but receives a string
//console.log(add(obj, "5"));
