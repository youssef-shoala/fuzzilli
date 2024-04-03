// Hypothetical code with a Use After Free vulnerability
function createObject() {
  let obj = {data: "sensitive information"};
  return obj;
}

function useObject(obj) {
  // Using the object
//  console.log(obj.data);
}

// Creating and using the object
let myObj = createObject();
useObject(myObj);

// Freeing the object from memory
myObj = null;

// Accessing the freed object, leading to a Use After Free vulnerability
useObject(myObj);
