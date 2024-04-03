function unconventionalFunction() {
    var buffer = new ArrayBuffer(1024);
    var view = new Uint8Array(buffer);
    var offset = 0;

    while (offset < 2048) {
        view[offset++] = Math.floor(Math.random() * 256); // Filling buffer with random bytes
    }
}

unconventionalFunction();
