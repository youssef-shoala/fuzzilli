function exploit() {
  // Create an object with a property that will be used for type confusion
  let obj = {
    prop: 123
  };

  // Define two different classes with conflicting property names
  class MyClass1 {
    constructor() {
      this.prop = 'Class 1';
    }
  }

  class MyClass2 {
    constructor() {
      this.prop = 'Class 2';
    }
  }

  // Create an array with elements of different types
  let arr = [obj, new MyClass1(), new MyClass2()];

  // Iterate over the array, causing type confusion
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].prop === 123) {
//      console.log("Type confusion occurred!");
      // Now arr[i] may be treated as if it were obj, MyClass1, or MyClass2 depending on the engine's behavior
    }
  }
}

// Execute the exploit
exploit();
