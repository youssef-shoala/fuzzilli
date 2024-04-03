// This is a simple proof-of-concept code demonstrating a type confusion vulnerability
// It does not pose any actual risk and should be used for academic purposes only

// Define a class 'Vehicle'
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  // Method to display vehicle information
  displayInfo() {
//    console.log(`Vehicle: ${this.make} ${this.model}`);
  }
}

// Define a class 'Car' which extends 'Vehicle'
class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model);
    this.year = year;
  }

  // Method to display car information, extending the displayInfo method
  displayInfo() {
//    console.log(`Car: ${this.year} ${this.make} ${this.model}`);
  }

  // Method specific to cars
  drive() {
//    console.log(`Driving the ${this.year} ${this.make} ${this.model}`);
  }
}

// Define a class 'Bike' which extends 'Vehicle'
class Bike extends Vehicle {
  constructor(make, model, type) {
    super(make, model);
    this.type = type;
  }

  // Method to display bike information, extending the displayInfo method
  displayInfo() {
//    console.log(`Bike: ${this.type} ${this.make} ${this.model}`);
  }

  // Method specific to bikes
  ride() {
//    console.log(`Riding the ${this.type} ${this.make} ${this.model}`);
  }
}

// Create an array containing both cars and bikes
const vehicles = [new Car('Toyota', 'Camry', 2020), new Bike('Honda', 'CBR', 'Sport')];

// Iterate over the array and call the displayInfo method for each vehicle
for (const vehicle of vehicles) {
  vehicle.displayInfo();
}

// Now, let's demonstrate a type confusion vulnerability
// We'll access the 'drive' method of the first element in the array, which is expected to be a car
// However, if the type of the first element is changed to 'Bike' later in the code, it will lead to type confusion

// Accessing 'drive' method of the first element
vehicles[0].drive(); // This should throw an error if 'vehicles[0]' is not a Car instance

// Now, let's change the type of the first element to 'Bike'
vehicles[0] = new Bike('Yamaha', 'YZF', 'Off-road');

// Attempting to access 'drive' method again
vehicles[0].drive(); // This should throw an error due to type confusion
