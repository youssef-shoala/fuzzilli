// Hypothetical code demonstrating a Use After Free vulnerability
function vulnerableFunction() {
  let obj = {data: "sensitive information"};
  let array = [obj];
  
  // Freeing the object from memory
  obj = null;
  
  // Accessing the freed object, leading to a Use After Free vulnerability
//  console.log(array[0].data);
}

// Triggering the vulnerability
vulnerableFunction();
