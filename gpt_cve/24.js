function exploit() {
  // Define a function constructor for creating objects
  function MyObject() {
    this.property = 'My Property';
  }

  // Create an instance of MyObject
  let obj = new MyObject();

  // Define a function constructor that appears unrelated
  function FakeObject() {
    this.fakeProperty = 'Fake Property';
  }

  // Modify the prototype of FakeObject to appear similar to MyObject
  FakeObject.prototype = {
    property: 'Fake Property Prototype'
  };

  // Create an array with mixed types, including instances of MyObject and FakeObject
  let arr = [obj, new FakeObject(), {}, "Type Confusion"];

  // Iterate over the array, causing type confusion
  for (let i = 0; i < arr.length; i++) {
    // Check if the current element has the 'property' property
    if (arr[i].property !== undefined) {
      // If it does, log its value
//      console.log(arr[i].property);
      // The engine might mistakenly treat arr[i] as if it were an instance of MyObject due to type confusion
    }
  }
}

// Execute the exploit
exploit();
