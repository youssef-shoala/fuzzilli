function triggerUseAfterFree() {
    let arr = [1, 2, 3];
    let freed = arr;
    arr = null; // Freeing the memory
    // Accessing the freed memory
//    console.log("Accessing freed memory:", freed[0]);
}

triggerUseAfterFree();
