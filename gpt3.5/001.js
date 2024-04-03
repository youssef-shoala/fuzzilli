// Example code demonstrating a buffer overflow vulnerability
function bufferOverflow() {
  let buffer = new ArrayBuffer(8);
  let uint8 = new Uint8Array(buffer);
  let int32 = new Int32Array(buffer);

  // Fill the buffer with values
  for (let i = 0; i < 10; i++) {
    uint8[i] = i + 1;
  }

  // Read beyond the allocated buffer size
  console.log(int32[2]);
}

// Example code demonstrating a use-after-free vulnerability
function useAfterFree() {
  let array = [1, 2, 3];

  let reference = array;

  // Free the memory occupied by the array
  array = null;

  // Attempt to access the freed memory
  console.log(reference.length);
}

// Example code demonstrating an integer overflow vulnerability
function integerOverflow() {
  let maxSafeInteger = Number.MAX_SAFE_INTEGER;
  
  // Incrementing beyond the maximum safe integer
  console.log(maxSafeInteger + 1);
}

// Execute the vulnerable functions
bufferOverflow();
useAfterFree();
integerOverflow();
