function exploitableFunction() {
    var arr = new Array(10);

    for (var i = 0; i < 10000; i++) {
        arr.push('B');
    }
}

exploitableFunction();
