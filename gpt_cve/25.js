function exploit() {
  // Define a base class
  class Base {
    constructor() {
      this.baseProp = 'Base Property';
    }
  }

  // Define a subclass that inherits from the base class
  class Subclass extends Base {
    constructor() {
      super();
      this.subProp = 'Subclass Property';
    }

    // Method specific to the subclass
    subclassMethod() {
//      console.log('Method specific to Subclass');
    }
  }

  // Create an array with elements of mixed types
  let arr = [new Base(), new Subclass(), {}, [], "Type Confusion"];

  // Iterate over the array, causing type confusion
  for (let i = 0; i < arr.length; i++) {
    // Check if the current element is an instance of the subclass
    if (arr[i] instanceof Subclass) {
      // If it is, attempt to call a method specific to the subclass
      arr[i].subclassMethod();
      // The engine might mistakenly treat arr[i] as a Subclass instance due to type confusion
    }
  }
}

// Execute the exploit
exploit();
