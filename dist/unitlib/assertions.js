export class Assert {
    static True(condition) {
        if (!condition)
            throw new Error('Condition was false');
    }
    static False(condition) {
        if (condition)
            throw new Error(`Condition was true`);
    }
    static Index(array, i) {
        if (i < 0 || i >= array.length)
            throw new Error(`Index out of range: ${array.length}[${i}]`);
    }
    static IsType(instance, className) {
        if (instance instanceof className)
            return;
        const got = instance?.constructor?.name ?? typeof instance;
        throw new Error(`Type mismatch: expected ${className.name}, got ${got}`);
    }
    static IsArray(instance, count) {
        if (!Array.isArray(instance))
            throw new Error('The object is not an array');
        if (count === undefined) {
            if (instance.length === 0)
                throw new Error('The array is empty');
        }
        else {
            if (instance.length !== count)
                throw new Error(`Expected array length ${count}, got ${instance.length}`);
        }
    }
}
